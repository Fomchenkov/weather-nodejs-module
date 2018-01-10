#!/usr/bin/env node
'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = '7ca53812a6dcac1b30f316f807354abd';

/**
 * Weather Data Class
 */

var WeatherData = function WeatherData(city, description, speed, temp) {
	_classCallCheck(this, WeatherData);

	this.city = city;
	this.description = description;
	this.speed = speed;
	this.temp = temp;
};

/**
 * Get Weather Data
 * @param {string} city 
 */


async function getWeatherData(city) {
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&lang=en&units=metric';
	var response = await _axios2.default.get(url).catch(function (e) {
		return console.log(e);
	});
	return new WeatherData(city, response.data['weather'][0]['description'], response.data['wind']['speed'], response.data['main']['temp']);
}

/**
 * Generate Weather Data
 * @param {WeatherData} weatherData 
 */
function generateWeatherMessage(weatherData) {
	return '\u0413\u043E\u0440\u043E\u0434 ' + weatherData.city + '\n' + ('\u0421\u0435\u0439\u0447\u0430\u0441 \u043D\u0430 \u0443\u043B\u0438\u0446\u0435 ' + weatherData.description + '\n') + ('\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0432\u0435\u0442\u0440\u0430: ' + Math.round(weatherData.speed) + '\n') + ('\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0432\u043E\u0437\u0434\u0443\u0445\u0430: ' + Math.round(weatherData.temp) + '\xB0C');
}

async function main() {
	var city = process.argv[2];

	if (!city) {
		console.log('No city!');
		process.exit(0);
	}

	var wd = await getWeatherData(city).catch(function (e) {
		return console.log(e);
	});
	var message = generateWeatherMessage(wd);
	console.log(message);
}

main();