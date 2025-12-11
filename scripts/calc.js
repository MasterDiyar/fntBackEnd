exports.calculate = (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (weight <= 0 || height <= 0) {
        return res.send("Invalid input: weight and height must be positive numbers.");
    }

    const bmi = 10_000*weight / (height * height);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    res.redirect(`/result?bmi=${bmi.toFixed(2)}&category=${category}`);
};