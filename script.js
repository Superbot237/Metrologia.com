async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) return alert("Digite uma cidade!");

    try {
        // Busca os dados da previsão
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await response.json();
        
        // Atualiza temperatura e condição atual
        const currentTemp = data.current_condition[0].temp_C;
        const condition = data.current_condition[0].weatherDesc[0].value;

        document.getElementById("temperature").innerText = `${currentTemp}°C`;
        document.getElementById("condition").innerText = `Clima: ${condition}`;

        // Atualiza previsão por hora
        const hourlyForecast = document.getElementById("hourly-forecast");
        hourlyForecast.innerHTML = "";

        const hours = data.weather[0].hourly; // Dados das próximas 24h

        hours.forEach((hourData, index) => {
            const time = index * 3; // wttr.in retorna previsões a cada 3 horas
            const temp = hourData.tempC;
            const icon = getWeatherIcon(hourData.weatherDesc[0].value);

            const hourDiv = document.createElement("div");
            hourDiv.classList.add("hour");
            hourDiv.innerHTML = `<strong>${time}:00</strong><br>${icon}<br>${temp}°C`;
            hourlyForecast.appendChild(hourDiv);
        });
    } catch (error) {
        alert("Erro ao buscar previsão. Verifique a cidade e tente novamente.");
    }
}

// Função para obter ícones baseados no clima
function getWeatherIcon(condition) {
    const icons = {
        "Clear": "☀️",
        "Sunny": "☀️",
        "Partly cloudy": "⛅",
        "Cloudy": "☁️",
        "Overcast": "☁️",
        "Mist": "🌫️",
        "Patchy rain possible": "🌧️",
        "Rain": "🌧️",
        "Thunderstorm": "⛈️",
        "Snow": "❄️",
        "Fog": "🌫️",
        "Haze": "🌫️",
        "Night Clear": "🌙"
    };
    
    return icons[condition] || "❓";
}
