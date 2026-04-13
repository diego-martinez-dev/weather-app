// Nuevo componente Forecast.jsx
const [forecast, setForecast] = useState(null);

const fetchForecast = async (cityName) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=es`
  );
  setForecast(response.data);
};
