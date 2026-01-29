const path = require('path');
const router = require('express').Router();
const Measurement = require('../models/Measurment');


router.get('/metrics', async (req, res) => {
    try {
        const { field } = req.query;

        const stats = await Measurement.aggregate([
            {
                $group: {
                    _id: null,
                    avg: { $avg: `$${field}` },
                    min: { $min: `$${field}` },
                    max: { $max: `$${field}` },
                    stdDev: { $stdDevPop: `$${field}` }
                }
            }
        ]);

        if (stats.length === 0) return res.status(404).json({ error: "No data found" });
        res.json(stats[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        if (Object.keys(req.query).length === 0) {
            return res.sendFile(path.join(__dirname, '../pages/charter.html'));
        }
        const { field, start_date, end_date } = req.query;

        const validFields = ['field1', 'field2', 'field3'];
        if (!validFields.includes(field)) return res.status(400).json({ error: "Invalid field name" });

        const query = {
            timestamp: { $gte: new Date(start_date), $lte: new Date(end_date) }
        };

        const data = await Measurement.find(query).select(`timestamp ${field} -_id`).sort('timestamp');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;