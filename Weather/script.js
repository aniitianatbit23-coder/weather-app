// ========== CONFIG ==========
const API_KEY = "9814f7bd4a0747c493945324250612"; // put your key here
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

// ========== DOM ==========
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const messageEl = document.getElementById("message");
const resultEl = document.getElementById("weather-result");

const cityNameEl = document.getElementById("city-name");
const countryCodeEl = document.getElementById("country-code");
const temperatureEl = document.getElementById("temperature");
const feelsLikeEl = document.getElementById("feels-like");
const iconEl = document.getElementById("weather-icon");
const descriptionEl = document.getElementById("weather-description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");

const greetingTextEl = document.getElementById("greeting-text");
const greetingEmojiEl = document.getElementById("greeting-emoji");

// ========== HELPERS ==========
function setMessage(text, type = "") {
  messageEl.textContent = text;
  messageEl.className = "message";
  if (type) messageEl.classList.add(type);
}

function showResult() {
  resultEl.classList.remove("hidden");
}

function hideResult() {
  resultEl.classList.add("hidden");
}

function setGreeting() {
  const hour = new Date().getHours();
  let text = "Welcome!";
  let emoji = "👋";

  if (hour >= 5 && hour < 12) {
    text = "Good morning, sky watcher.";
    emoji = "🌅";
  } else if (hour >= 12 && hour < 18) {
    text = "Good afternoon, sunshine.";
    emoji = "🌤️";
  } else if (hour >= 18 && hour < 22) {
    text = "Good evening, stargazer.";
    emoji = "🌇";
  } else {
    text = "Late night forecast time.";
    emoji = "🌙";
  }

  greetingTextEl.textContent = text;
  greetingEmojiEl.textContent = emoji;
}

// ========== API CALL ==========
async function fetchWeather(city) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&aqi=no`;

  try {
    setMessage("Checking the sky for you...", "success");
    hideResult();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch weather. Check the city name.");
    }

    const data = await response.json();
    updateUI(data);
    setMessage(`Weather loaded for ${data.location.name}`, "success");
  } catch (err) {
    console.error(err);
    hideResult();
    setMessage(err.message || "Something went wrong.", "error");
  }
}

// ========== UPDATE UI ==========
function updateUI(data) {
  const loc = data.location;
  const cur = data.current;

  cityNameEl.textContent = loc.name || "-";
  countryCodeEl.textContent = loc.country || "N/A";

  temperatureEl.textContent =
    typeof cur.temp_c === "number" ? `${Math.round(cur.temp_c)}°C` : "-";

  feelsLikeEl.textContent =
    typeof cur.feelslike_c === "number"
      ? `Feels like ${Math.round(cur.feelslike_c)}°C`
      : "";

  humidityEl.textContent =
    typeof cur.humidity === "number" ? `${cur.humidity}%` : "N/A";

  windEl.textContent =
    typeof cur.wind_kph === "number" ? `${cur.wind_kph} km/h` : "N/A";

  pressureEl.textContent =
    typeof cur.pressure_mb === "number" ? `${cur.pressure_mb} mb` : "N/A";

  if (cur.condition && cur.condition.icon) {
    iconEl.src = `https:${cur.condition.icon}`;
    iconEl.style.display = "block";
  } else {
    iconEl.style.display = "none";
  }

  descriptionEl.textContent = cur.condition?.text || "";
  showResult();
}

// ========== EVENTS ==========
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    setMessage("Please enter a city name.", "error");
    hideResult();
    return;
  }
  fetchWeather(city);
});

// initial greeting
setGreeting();
