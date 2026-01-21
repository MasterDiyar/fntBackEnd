const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;

        if (!title || !body) {
            return res.status(400).json({
                message: "Title and body are required"
            });
        }
        const blog = await Blog.create({ title, body, author });
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({
            message: "Failed to create blog post",
            error: err.message
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({
            message: "Failed to get blog posts",
            error: err.message
        });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog post not found"
            });
        }

        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json({
            message: "Invalid blog ID",
            error: err.message
        });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body) {
            return res.status(400).json({
                message: "Title and body are required"
            });
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, body, author },
            { new: true, runValidators: true }
        );
        if (!blog) {
            return res.status(404).json({message: "Blog post not found"});
        }

        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json({
            message: "Failed to update blog post",
            error: err.message
        });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog post not found"
            });
        }

        res.status(200).json({
            message: "Blog post deleted successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: "Failed to delete blog post",
            error: err.message
        });
    }
};
