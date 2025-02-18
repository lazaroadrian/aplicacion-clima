import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = '6b9dd23411610c812554b34fe3c55867';
  const difKelvin = 273.15;
  const [ciudad, setCiudad] = useState('');
  const [dataClima, setDataClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad) fetchClima();
  };

  const fetchClima = async () => {
    setCargando(true);
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      if (response.ok) {
        setDataClima(data);
      } else {
        console.error('Error:', data.message);
        alert('Ciudad no encontrada. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Ocurrió el siguiente problema:', error);
      alert('Hubo un error al conectarse a la API.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
          placeholder="Ingresa una ciudad"
        />
        <button type="submit">Buscar</button>
      </form>
      {cargando && <p>Cargando...</p>}
      {!cargando && dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima.main.temp - difKelvin)}°C</p>
          <p>Condición meteorológica: {dataClima.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};