const API_KEY = "f00c38e0279b7bc85480c3fe775d518c"; // 🔥 Replace this with your real API Key

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherDisplay = document.getElementById("weatherDisplay");
    const errorMessage = document.getElementById("errorMessage");

    if (!city) {
        alert("❌ Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error(`❌ City not found!`);
        }

        const data = await response.json();
        console.log("Weather Data:", data);

        document.getElementById("cityName").textContent = `📍 ${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `🌡 Temperature: ${data.main.temp}°C`;
        document.getElementById("condition").textContent = `☁ Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherDisplay.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    } catch (error) {
        weatherDisplay.classList.add("hidden");
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
}
