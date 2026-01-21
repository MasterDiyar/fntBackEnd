const express = require("express");
const router = express.Router();

const bmiController = require("../scripts/calc");
const path = require("path");
const apiController = require("../scripts/apiController");

router.post("/calculate", bmiController.calculate);
router.get("/random-user", apiController.getRandomUserFull);

router.get("/result", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "weightres.html"));
});

router.get("/apiLog", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "apiS.html"));
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "index.html"));
});

router.get("/weight", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "WeightMeter.html"));
});

router.get("/blogs-page", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "blogs.html"));
});
router.get("/create-blog", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "createBlog.html"));
});

router.get("/blog-page", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "blog.html"));
});


module.exports = router;
