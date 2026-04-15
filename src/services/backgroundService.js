// Mapeo de condiciones climáticas a imágenes
const weatherBackgrounds = {
  // Soleado / Despejado
  clear: {
    day: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1200&h=800&fit=crop',
    night: 'https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?w=1200&h=800&fit=crop',
    description: 'Cielo despejado'
  },
  // Nublado
  clouds: {
    day: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&h=800&fit=crop',
    night: 'https://images.unsplash.com/photo-1506703398816-2d4be0bd48d8?w=1200&h=800&fit=crop',
    description: 'Nublado'
  },
  // Lluvia
  rain: {
    day: 'https://images.unsplash.com/photo-1519692933481-e162a3d672be?w=1200&h=800&fit=crop',
    night: 'https://images.unsplash.com/photo-1501691223387-dd050040307c?w=1200&h=800&fit=crop',
    description: 'Lluvia'
  },
  // Tormenta
  thunderstorm: {
    day: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc84?w=1200&h=800&fit=crop',
    night: 'https://images.unsplash.com/photo-1599934793601-f8d96f3d6f27?w=1200&h=800&fit=crop',
    description: 'Tormenta eléctrica'
  },
  // Nieve
  snow: {
    day: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=1200&h=800&fit=crop',
    night: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1200&h=800&fit=crop',
    description: 'Nieve'
  },
  // Niebla
  mist: {
    day: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1200&h=800&fit=crop',
    night: 'https://images.unsplash.com/photo-1545713480-40005e1f8ac9?w=1200&h=800&fit=crop',
    description: 'Niebla'
  }
};

// Obtener la condición principal del clima
const getWeatherCondition = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes('clear') || desc.includes('sun')) return 'clear';
  if (desc.includes('cloud')) return 'clouds';
  if (desc.includes('rain') || desc.includes('drizzle')) return 'rain';
  if (desc.includes('thunder')) return 'thunderstorm';
  if (desc.includes('snow')) return 'snow';
  if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return 'mist';
  return 'clear';
};

// Determinar si es de día o noche basado en el amanecer/atardecer
const isDayTime = (sunrise, sunset, currentTime) => {
  if (!sunrise || !sunset) return true; // Por defecto día
  return currentTime > sunrise && currentTime < sunset;
};

// Obtener la URL del fondo según el clima y hora
export const getWeatherBackground = (weather, currentTime, sunrise, sunset) => {
  if (!weather || !weather.weather || !weather.weather[0]) {
    return weatherBackgrounds.clear.day;
  }
  
  const condition = getWeatherCondition(weather.weather[0].description);
  const isDay = isDayTime(sunrise, sunset, currentTime);
  const timeOfDay = isDay ? 'day' : 'night';
  
  return weatherBackgrounds[condition][timeOfDay];
};

// Obtener overlay (capa semitransparente) según hora
export const getOverlayColor = (isDay) => {
  if (isDay) {
    return 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)';
  }
  return 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)';
};