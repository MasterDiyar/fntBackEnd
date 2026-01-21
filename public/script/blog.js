const id = new URLSearchParams(window.location.search).get("id");
const viewMode = document.getElementById('view-mode');
const editMode = document.getElementById('edit-mode');

fetch(`/blogs/${id}`)
    .then(res => res.json())
    .then(blog => {
        document.getElementById("title").textContent = blog.title;
        document.getElementById("body").textContent = blog.body;
        document.getElementById("author").textContent = "by " + blog.author;
        document.getElementById("date").textContent = new Date(blog.createdAt).toLocaleString();

        document.getElementById("edit-title").value = blog.title;
        document.getElementById("edit-body").value = blog.body;
        document.getElementById("edit-author").value = blog.author;
    })
    .catch(() => alert("Blog not found"));

function toggleEdit() {
    const isEditing = editMode.style.display === 'block';
    editMode.style.display = isEditing ? 'none' : 'block';
    viewMode.style.display = isEditing ? 'block' : 'none';
}

function deletePost() {
    if (confirm("Are you sure?")) {
        fetch(`/blogs/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    alert("Post deleted!");
                    window.location.href = "/blogs-page";
                }
            })
            .catch(err => alert("Error deleting post"));
    }
}

document.getElementById('edit-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedBlog = {
        title: document.getElementById('edit-title').value,
        body: document.getElementById('edit-body').value,
        author: document.getElementById('edit-author').value
    };

    fetch(`/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBlog)
    })
        .then(res => {
            if (res.ok) {
                alert("Updated successfully!");
                location.reload();
            }
        })
        .catch(err => alert("Error updating post"));
});