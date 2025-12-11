const express = require("express");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const fntRoutes = require("./routes/fntRouter");
app.use("/", fntRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

