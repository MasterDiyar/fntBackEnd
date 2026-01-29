require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const blogRouter = require("./routes/blogRouter");
app.use("/blogs", blogRouter);
const fntRoutes = require("./routes/fntRouter");
app.use("/", fntRoutes);
const analyticRoutes = require('./routes/analyticRouter');
app.use('/measurments', analyticRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

