import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WeatherDashboard from './pages/WeatherDashboard';
import FormWeather from './components/formWeatherCard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/forecasts" />} />
        <Route path="/forecasts" element={<WeatherDashboard />} />
        <Route path="/add-forecasts" element={<FormWeather />} />
      </Routes>
    </Router>
  );
};

export default App;
