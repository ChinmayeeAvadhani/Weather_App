// Theme switching functionality
const themeSwitch = document.querySelector('.theme-switch');
const themeHandle = document.querySelector('.theme-switch-handle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    body.classList.add('light-mode');
    themeHandle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    body.classList.remove('light-mode');
    themeHandle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeSwitch.addEventListener('click', function() {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeHandle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'dark');
        themeHandle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Update background based on time of day
function updateBackground() {
    const hour = new Date().getHours();
    const background = document.querySelector('.background');
    background.classList.remove('morning', 'afternoon', 'evening', 'night');
    if (hour >= 5 && hour < 12) {
        background.classList.add('morning');
        background.style.background = 'linear-gradient(135deg, #ff9d6c, #ff6b6b)';
    } else if (hour >= 12 && hour < 17) {
        background.classList.add('afternoon');
        background.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';
    } else if (hour >= 17 && hour < 21) {
        background.classList.add('evening');
        background.style.background = 'linear-gradient(135deg, #fa709a, #fee140)';
    } else {
        background.classList.add('night');
        background.style.background = 'linear-gradient(135deg, #1a1c2d, #2d324d)';
    }
}
updateBackground();
setInterval(updateBackground, 60000); // Update every minute

// Add subtle animations to weather icons
const weatherIcons = document.querySelectorAll('i');
weatherIcons.forEach(icon => {
    if (icon.classList.contains('fa-sun')) {
        icon.style.animation = 'rotateRays 10s infinite linear';
    } else if (icon.classList.contains('fa-cloud')) {
        icon.style.animation = 'float 5s infinite ease-in-out';
    }
});

// Example: Dynamic background and overlays (stub, expand with real data)
function setDynamicBackground({weather, season, timeOfDay, location}) {
    // Set scenic image (could use Unsplash API or static images)
    const bgScenery = document.querySelector('.bg-scenery');
    // Example: choose by season or location
    if (season === 'Winter') bgScenery.style.backgroundImage = "url('winter-mountains.jpg')";
    else if (season === 'Monsoon') bgScenery.style.backgroundImage = "url('monsoon-india.jpg')";
    else if (season === 'Summer') bgScenery.style.backgroundImage = "url('beach.jpg')";
    else if (season === 'Autumn') bgScenery.style.backgroundImage = "url('autumn-forest.jpg')";
    else bgScenery.style.backgroundImage = "url('city-skyline.jpg')";

    // Set pastel gradient filter
    const bgGradient = document.querySelector('.bg-gradient');
    if (weather === 'Rain') bgGradient.style.background = "linear-gradient(135deg, #314755 0%, #26a0da 100%)";
    else if (weather === 'Snow') bgGradient.style.background = "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)";
    else if (weather === 'Clear' && timeOfDay === 'day') bgGradient.style.background = "linear-gradient(135deg, #ffe259 0%, #ffa751 100%)";
    else if (weather === 'Clear' && timeOfDay === 'night') bgGradient.style.background = "linear-gradient(135deg, #232526 0%, #414345 100%)";
    else if (weather === 'Clouds') bgGradient.style.background = "linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)";
    else bgGradient.style.background = "linear-gradient(135deg, #a3d9ff 0%, #fbc2eb 100%)";

    // Show/hide overlays
    document.querySelector('.bg-anim.clouds').style.display = (weather === 'Clouds' || weather === 'Rain') ? 'block' : 'none';
    document.querySelector('.bg-anim.sun-rays').style.display = (weather === 'Clear' && timeOfDay === 'day') ? 'block' : 'none';
    document.querySelector('.bg-anim.snowflakes').style.display = (weather === 'Snow') ? 'block' : 'none';
    document.querySelector('.bg-anim.rain').style.display = (weather === 'Rain') ? 'block' : 'none';
    document.querySelector('.bg-anim.aurora').style.display = (season === 'Winter' && location === 'Norway') ? 'block' : 'none';
    document.querySelector('.bg-anim.leaves').style.display = (season === 'Autumn') ? 'block' : 'none';
    document.querySelector('.bg-anim.stars').style.display = (timeOfDay === 'night') ? 'block' : 'none';
}

// Example: Animate weather icon in main panel
function setWeatherAnimIcon(condition) {
    const iconDiv = document.getElementById('weather-anim-icon');
    iconDiv.innerHTML = '';
    let icon;
    if (condition === 'Rain') icon = '<i class="fas fa-cloud-showers-heavy animated-rain"></i>';
    else if (condition === 'Snow') icon = '<i class="fas fa-snowflake animated-snow"></i>';
    else if (condition === 'Clear') icon = '<i class="fas fa-sun animated-sun"></i>';
    else if (condition === 'Clouds') icon = '<i class="fas fa-cloud animated-cloud"></i>';
    else icon = '<i class="fas fa-smog"></i>';
    iconDiv.innerHTML = icon;
}

// Example: Set seasonal info
function setSeasonInfo({season, location}) {
    document.getElementById('season-name').textContent = season ? `${season} Season` : '--';
    document.getElementById('season-location').textContent = location || '--';
    let icon = '';
    if (season === 'Winter') icon = '<i class="fas fa-snowflake"></i>';
    else if (season === 'Monsoon') icon = '<i class="fas fa-cloud-rain"></i>';
    else if (season === 'Summer') icon = '<i class="fas fa-sun"></i>';
    else if (season === 'Autumn') icon = '<i class="fas fa-leaf"></i>';
    else if (season === 'Spring') icon = '<i class="fas fa-seedling"></i>';
    document.getElementById('season-icon').innerHTML = icon;
}

// Example: Set AQI
function setAQI(aqi) {
    const value = document.getElementById('aqi-value');
    const status = document.getElementById('aqi-status');
    const desc = document.getElementById('aqi-desc');
    value.textContent = aqi.value || '--';
    status.textContent = aqi.status || '--';
    desc.textContent = aqi.desc || '--';
    // Color gradient for AQI
    status.style.background = aqi.color || 'rgba(100,255,100,0.2)';
}

// Example: Set weather alert
function setWeatherAlert(alert) {
    const alertDiv = document.getElementById('weather-alert');
    if (alert && alert.message) {
        document.getElementById('alert-title').textContent = alert.title || 'Weather Alert';
        document.getElementById('alert-message').textContent = alert.message;
        alertDiv.style.display = 'flex';
    } else {
        alertDiv.style.display = 'none';
    }
}

// Example: Set main weather data (stub, replace with real API data)
function setWeatherData(data) {
    document.getElementById('current-temp').textContent = data.temp + '°';
    document.getElementById('current-location').textContent = data.location;
    document.getElementById('current-condition').textContent = data.condition;
    setWeatherAnimIcon(data.condition);
    document.getElementById('humidity').textContent = data.humidity + '%';
    document.getElementById('wind').textContent = data.wind + ' km/h';
    document.getElementById('wind-dir').textContent = data.windDir;
    document.getElementById('feels-like').textContent = data.feelsLike + '°';
    document.getElementById('uv').textContent = data.uv;
    document.getElementById('pressure').textContent = data.pressure + ' hPa';
    document.getElementById('visibility').textContent = data.visibility + ' km';
    document.getElementById('sunrise').textContent = data.sunrise;
    document.getElementById('sunset').textContent = data.sunset;
    // Hourly and weekly forecast, AQI, season, alert, background
    // setHourlyForecast(data.hourly);
    // setWeeklyForecast(data.weekly);
    setAQI(data.aqi);
    setSeasonInfo({season: data.season, location: data.location});
    setWeatherAlert(data.alert);
    setDynamicBackground({
        weather: data.condition,
        season: data.season,
        timeOfDay: data.timeOfDay,
        location: data.location
    });
}

// Example: Demo data for UI preview (replace with real API integration)
setWeatherData({
    temp: 26,
    location: "Bangalore",
    condition: "Clouds",
    humidity: 65,
    wind: 12,
    windDir: "NE",
    feelsLike: 28,
    uv: 7,
    pressure: 1012,
    visibility: 10,
    sunrise: "06:24",
    sunset: "18:45",
    aqi: { value: 42, status: "Good", desc: "Air quality is satisfactory, and air pollution poses little or no risk.", color: "rgba(100,255,100,0.2)" },
    season: "Monsoon",
    timeOfDay: "day",
    alert: { title: "Thunderstorm Warning", message: "Possible thunderstorms expected on Saturday. Plan accordingly." }
});

// Ensure overlays are visible for demo (remove for real API integration)
document.querySelector('.bg-anim.clouds').style.display = 'block';
document.querySelector('.bg-anim.sun-rays').style.display = 'block';
document.querySelector('.bg-anim.snowflakes').style.display = 'block';
document.querySelector('.bg-anim.rain').style.display = 'block';
document.querySelector('.bg-anim.aurora').style.display = 'block';
document.querySelector('.bg-anim.leaves').style.display = 'block';
document.querySelector('.bg-anim.stars').style.display = 'block';
