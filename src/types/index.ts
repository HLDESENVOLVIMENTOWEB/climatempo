export interface WeatherData {
  latitude: number | null | undefined;
  longitude: number | null | undefined;
  timezone: string | null | undefined;
  timezoneAbbreviation: string | null | undefined;
  utcOffsetSeconds: number | null | undefined;
  weatherData: Hourly;
}

interface Hourly {
  hourly: {
    relativehumidity_2m: Float32Array | null | undefined;
    temperature2m: Float32Array | null | undefined;
    time: Date[] | null | undefined;
    windspeed_10m: Float32Array | null | undefined;
  };
}
