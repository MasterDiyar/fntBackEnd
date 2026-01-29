const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now, index: true },
    field1: { type: Number, required: true }, // Temperature
    field2: { type: Number, required: true }, // Humidity
    field3: { type: Number, required: true }, // Pressure / Wind Speed
    city: { type: String, default: "Almaty" }  // Доп. поле для контекста
});

module.exports = mongoose.model('Measurment', measurementSchema);