const axios = require('axios');
const Measurement = require('../models/Measurment');

const API_KEY = 'ТВОЙ_КЛЮЧ_OPENWEATHER';
const CITY = 'Almaty';

async function saveData() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
    const res = await axios.get(url);

    await Measurement.create({
        field1: res.data.main.temp,
        field2: res.data.main.humidity,
        field3: res.data.main.pressure,
        timestamp: new Date()
    });
    console.log("Weather data saved!");
}