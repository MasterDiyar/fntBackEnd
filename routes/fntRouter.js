const express = require("express");
const router = express.Router();

const bmiController = require("../scripts/calc");

router.post("/calculate", bmiController.calculate);

module.exports = router;
