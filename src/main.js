#!/usr/bin/env node

import axios from 'axios'

const apiKey = '7ca53812a6dcac1b30f316f807354abd'

/**
 * Weather Data Class
 */
class WeatherData {
	constructor(city, description, speed, temp) {
		this.city = city
		this.description = description
		this.speed = speed
		this.temp = temp
	}
}

/**
 * Get Weather Data
 * @param {string} city 
 */
async function getWeatherData(city) {
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}`
	url += `&appid=${apiKey}&lang=en&units=metric`
	let response = await axios.get(url).catch(e => e)
	if (! response) {
		return new WeatherData('', '', '', '')
	}
	return new WeatherData(
		city, 
		response.data['weather'][0]['description'], 
		response.data['wind']['speed'], 
		response.data['main']['temp'])
}

/**
 * Generate Weather Data
 * @param {WeatherData} weatherData 
 */
function generateWeatherMessage(weatherData) {
	if (! weatherData.city) {
		return 'City not found!'
	}
	return `Город ${weatherData.city}\n` +
		`Сейчас на улице ${weatherData.description}\n` +
		`Скорость ветра: ${Math.round(weatherData.speed)}\n` + 
		`Температура воздуха: ${Math.round(weatherData.temp)}°C`
}

async function main() {
	let city = process.argv[2]

	if (! city) {
		console.log('No city!\n$ kronver-weather <City>`')
		process.exit(0)
	}

	let wd = await getWeatherData(city).catch(e => e)
	let message = generateWeatherMessage(wd)
	console.log(message)
}

main()
