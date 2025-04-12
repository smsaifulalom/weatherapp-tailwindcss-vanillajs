const apiKey = "15a7e9e3a2eba96e77be3765e0ef75d6";

function enterKey(event){
    if(event.key === "Enter"){
        getWeather();
    }
}

function getWeather(){
    const cityInput = document.getElementById("cityInput").value;
    const weatherResult = document.getElementById("weatherResult");

    if(!cityInput){
        weatherResult.innerHTML = 
        `<p class="text-red-500">Please enter a city</p>`;
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then (res => res.json())
    .then (data => {
        if(data.cod === "404"){
            weatherResult.innerHTML = 
            `<p class="text-red-500">City not found</p>`;
            return;
        }

        const weatherHTML = 
        `<h2 class="text-2xl font-semibold">${data.name}, ${data.sys.country}</h2>
        <p class="text-xl">Latitude: ${data.coord.lat}</p>
        <p class="text-xl">Longitude: ${data.coord.lon}</p>
        <p class="text-lg font-bold">Actual Temperature: ${data.main.temp}°C, Feels like ${data.main.feels_like}°C</p>
        <p class="text-red-500">Maximum Temperature: ${data.main.temp_max}°C</p>
        <p class="text-green-500">Minimum Temperature: ${data.main.temp_min}°C</p>
        <p class="capitalize">${data.weather[0].description}</p>
        <img class="mx-auto" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        `

        weatherResult.innerHTML = weatherHTML;
        console.log(data);
    })

    .catch(error => {
        weatherResult.innerHTML = `<p class="text-red-500">Something went wrong</p>`
    })
}