
let loading = document.getElementById('loading');

const getWeather = async () => {
    try {
        let city = document.getElementById('city-input').value.trim();
        if (city == "") return alert("invalid input");
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1ecfa0f914fee84260e7f4511b9d67dc`)
        let data = await response.json()
        return data
    } catch (error) {
        console.log(error.message)
        alert("invalid city")
    }
}
const showWeather = async () => {
    loading.innerHTML = `
    <div class="spinner-border" role="status" style="color: #608094;"></div>
          <span>Loading ...</span> 
    `
    let weatherData = await getWeather()
    const { weather, main: temprature } = weatherData
    if (weatherData.cod == 200) {
        loading.style.display = "none";
        document.getElementsByClassName('weather-data')[0].innerHTML = `
        <h1 class="title">${weatherData.name}, ${weatherData.sys.country}</h1>
         <div style="display: flex; justify-content: space-between; align-items: center; max-height: 137px; padding-top:30px">
         <div><img src=${weather[0].main == "Clouds" ? "./images/cloudsGif.svg" :
                weather[0].main == "Smoke" || weather[0].main == "Haze" ? "./images/mist.gif" :
                    weather[0].main == "Rain" ? "./images/rainGif.gif" :
                        "./images/clear.gif"} width="100px"/>
         <p style="text-align: center;">${weather[0].main}</p></div>
         <h3>${Math.round(temprature.temp)}°C</h3>
         <div>
             <p>wind: ${Math.round(weatherData.wind.speed)} kmph</p>
             <p>pressure: ${temprature.pressure}</p>
             <p>feels like: ${Math.round(temprature.feels_like)}</p>
         </div>
     </div>
     `
        document.getElementById('city-input').value = ""
    } else {
        loading.innerHTML = `Enter city name `
        document.getElementById('city-input').value = ""
        return alert("Not a city")
    }
}
