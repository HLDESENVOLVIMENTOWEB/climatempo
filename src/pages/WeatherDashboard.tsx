import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { weatherDataState, fetchWeatherData } from '../state/weatherState';
import WeatherCard from '../components/WeatherCard';
import { weatherApiParamsState } from '../state/weatherAtom';

import LoadComponent from '../components/loading';
import { FaSearch, FaCogs } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { setStorageLatLong } from '../utils';

const WeatherDashboard: React.FC = () => {
  const [load, setLoad] = useState<boolean>(false);

  const navigate = useNavigate();

  const weatherData = useRecoilValueLoadable(fetchWeatherData);
  const [weather, setWeather] = useRecoilState(weatherDataState);

  const setWeatherParams = useSetRecoilState(weatherApiParamsState);

  useEffect(() => {
    if (weatherData.state === 'hasValue') {
      setWeather(weatherData.contents ?? null);
      setLoad(true);
    }
    if (weatherData.state === 'loading') {
      setLoad(false);
    }
    if (weatherData.state === 'hasError') {
      setWeather(weatherData.contents ?? null);
      setLoad(false);
    }
  }, [weatherData, setWeather, setWeatherParams]);

  return (
    <div>
      <div className="col-span-1 flex justify-center items-center">
        <button
          type="submit"
          onClick={() => navigate('/add-forecasts')}
          className="
              text-white 
              bg-green-700 
              hover:bg-green-800 
              focus:outline-none 
              px-4 
              py-2 
              mt-4 
              bg-blue-500 
              text-white 
              rounded 
              text-center 
              inline-flex 
              items-center"
        >
          <FaSearch /> &nbsp; Buscar por coordenadas
        </button>

        <button
          type="submit"
          onClick={() => {
            setStorageLatLong('', '');
            window.location.reload();
          }}
          className="
              text-green 
              bg-gray-700 
              hover:bg-gray-800 
              focus:outline-none 
              px-4 
              py-2 
              mt-4 
              bg-blue-500 
              text-white 
              rounded 
              text-center 
              inline-flex 
              items-center
              ml-2"
        >
          <FaCogs /> &nbsp; Limpar
        </button>
      </div>
      {load ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  p-4 place-items-center h-screen">
          {weather &&
            Array.from(weather.weatherData.hourly.temperature2m || []).map((_, index) => (
              <WeatherCard
                key={index} // Chave única para cada componente na lista
                time={weather.weatherData.hourly.time ? weather.weatherData.hourly.time[index] : 'N/A'}
                titleTemperature="Temperature"
                titleWindspeed="Velocidade do vento"
                titleRelativehumidit="Umidade"
                temperature={
                  weather.weatherData.hourly.temperature2m
                    ? weather.weatherData.hourly.temperature2m[index].toFixed(1)
                    : 'N/A'
                }
                unitTemperature="°C"
                unitWindspeed="km/h"
                unitRelativehumidity="%"
                relativehumidity={
                  weather.weatherData.hourly.relativehumidity_2m
                    ? weather.weatherData.hourly.relativehumidity_2m[index].toFixed(2)
                    : 'N/A'
                }
                windspeed={
                  weather.weatherData.hourly.windspeed_10m
                    ? weather.weatherData.hourly.windspeed_10m[index].toFixed(2)
                    : 'N/A'
                }
              />
            ))}
        </div>
      ) : (
        <LoadComponent />
      )}
    </div>
  );
};

export default WeatherDashboard;
