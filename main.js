//Set up event listener for intial API Fetch

document.querySelector('button').addEventListener('click',getFetch) 

function getFetch() {
    let zipCode = document.querySelector('.zipCode').value
    let city = document.querySelector('.citySearch')

fetch(`https://api.weatherapi.com/v1/forecast.json?key=5954a2ecb62f4e4788122034221504&q=${zipCode}&days=10&aqi=yes&alerts=yes`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const forecast = new WeatherForecast(data)
        forecast.createForecast()
        forecast.showLocation()
    })
    .then(err => {
        console.log(`${err}`)
    })
}

class WeatherForecast {
    constructor(forecastData) {
        this.city = forecastData.location.name;
        this.state = forecastData.location.region;
        this.country = forecastData.location.country;
        this.today = forecastData.forecast.forecastday[0].date;
        this.tomorrow = forecastData.forecast.forecastday[1].date;
        this.twoDays = forecastData.forecast.forecastday[2].date;
        this.todayTemp = forecastData.current.feelslike_f;
        this.todayCondition = forecastData.current.condition.text;
        this.todayImg = forecastData.current.condition.icon;
        this.tomorrowTemp = forecastData.forecast.forecastday[1].day.avgtemp_f;
        this.tomorrowCondition = forecastData.forecast.forecastday[1].day.condition.text;
        this.tomorrowImg = forecastData.forecast.forecastday[1].day.condition.icon;
        this.twoDayTemp = forecastData.forecast.forecastday[2].day.avgtemp_f;
        this.twoDayCondition = forecastData.forecast.forecastday[2].day.condition.text;
        this.twoDayImg = forecastData.forecast.forecastday[2].day.condition.icon;
    }
    createForecast() {
        document.querySelector('.currentDate').innerText = this.today;
        document.querySelector('.currentWeather').innerText = this.todayCondition
        document.querySelector('.currentImg').src = this.todayImg
        document.querySelector('.currentTemp').innerHTML = this.todayTemp

        document.querySelector('.tomorrow').innerText = this.tomorrow;
        document.querySelector('.weather24').innerText = this.tomorrowCondition;
        document.querySelector('.img24').src =this.tomorrowImg;
        document.querySelector('.temp24').innerHTML = this.tomorrowTemp;

        document.querySelector('.twoDays').innerText = this.twoDays;
        document.querySelector('.weather48').innerText = this.twoDayCondition;
        document.querySelector('.img48').src = this.twoDayImg;
        document.querySelector('.temp48').innerHTML = this.twoDayTemp;
    }

    showLocation() {
        document.querySelector('.city').innerHTML = this.city;
        document.querySelector('.state').innerHTML = this.state;
        document.querySelector('.country').innerHTML = this.country;
    }
}