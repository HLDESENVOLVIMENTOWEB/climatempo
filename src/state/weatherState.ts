import { atom, selector } from 'recoil';
import { WeatherData } from '../types';
import { fetchWeatherApi } from 'openmeteo';
import { weatherApiParamsState } from '../state/weatherAtom';
import { url } from './api';

export const weatherDataState = atom<WeatherData | null>({
  key: 'weatherDataState',
  default: null,
});

export const fetchWeatherData = selector({
  key: 'fetchWeatherData',
  get: async ({ get }) => {
    const params = get(weatherApiParamsState);
    const responses = await fetchWeatherApi(url, params);

    if (!responses || responses.length === 0) {
      console.error('No data received from the API');
      return;
    }

    const response = responses[0];

    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const range = (start: number, stop: number, step: number): number[] =>
      Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly();

    if (!hourly) {
      console.error('Hourly data is undefined');
      return;
    }

    const startTime = Number(hourly.time());
    const endTime = Number(hourly.timeEnd());
    const interval = hourly.interval();

    const timeRange = range(startTime, endTime, interval).map((t) => new Date((t + utcOffsetSeconds) * 1000));

    const temperature2m = hourly.variables(0)?.valuesArray();
    const windspeed_10m = hourly.variables(1)?.valuesArray();
    const relativehumidity_2m = hourly.variables(2)?.valuesArray();

    if (!temperature2m) {
      console.error('Temperature data is undefined');
      return;
    }

    if (!windspeed_10m) {
      console.error('Temperature data is undefined');
      return;
    }

    if (!relativehumidity_2m) {
      console.error('Temperature data is undefined');
      return;
    }

    const weatherData = {
      hourly: {
        time: timeRange,
        temperature2m: temperature2m,
        windspeed_10m: windspeed_10m,
        relativehumidity_2m: relativehumidity_2m,
      },
    };

    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      console.log(weatherData.hourly.time[i].toISOString(), weatherData.hourly.temperature2m[i]);
    }

    const data = {
      utcOffsetSeconds,
      timezone,
      timezoneAbbreviation,
      latitude,
      longitude,
      weatherData,
    };

    return data;
  },
});
