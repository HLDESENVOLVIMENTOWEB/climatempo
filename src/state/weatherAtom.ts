import { atom } from 'recoil';
import { WeatherType } from '../enum';

export const weatherApiParamsState = atom({
  key: 'weatherApiParamsState',
  default: {
    latitude: localStorage.getItem('latitude') ? localStorage.getItem('latitude') : 52.52,
    longitude: localStorage.getItem('longitude') ? localStorage.getItem('longitude') : 52.5,
    hourly: `${WeatherType.relativehumidity_2m},${WeatherType.temperature_2m},${WeatherType.windspeed_10m}`,
  },
});
