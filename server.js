const express = require("express");
const path = require("path");

const app = express();

// Раздача статических файлов, если нужно
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
