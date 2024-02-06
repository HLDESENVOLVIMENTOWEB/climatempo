import React from 'react';
import { useSetRecoilState } from 'recoil';
import { weatherApiParamsState } from '../state/weatherAtom';

import { FaSearch, FaArrowLeft } from 'react-icons/fa';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { WeatherType } from '../enum';

import { useNavigate } from 'react-router-dom';
import { setStorageLatLong } from '../utils';

const FormWeather: React.FC = () => {
  const setWeatherParams = useSetRecoilState(weatherApiParamsState);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      latitude: '',
      longitude: '',
    },
    validationSchema: yup.object({
      latitude: yup.string().required('Latitude é obrigatório.'),
      longitude: yup.string().required('Longitude é obrigatório.'),
    }),
    onSubmit: (values) => {
      setStorageLatLong(values.latitude, values.longitude);
      setWeatherParams({
        latitude: parseFloat(values.latitude),
        longitude: parseFloat(values.longitude),
        hourly: `${WeatherType.relativehumidity_2m},${WeatherType.temperature_2m},${WeatherType.windspeed_10m}`,
      });

      navigate('/forecasts');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 p-2 grid">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-7 gap-4 items-center">
        <div className="col-span-3">
          <label htmlFor="latitude" className="block">
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.latitude}
            className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
          />
          {formik.touched.latitude && formik.errors.latitude ? <div>{formik.errors.latitude}</div> : null}
        </div>
        <div className="col-span-3">
          <label htmlFor="longitude" className="block">
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.longitude}
          />
          {formik.touched.longitude && formik.errors.longitude ? <div>{formik.errors.longitude}</div> : null}
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <button
            type="submit"
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
            <FaSearch /> &nbsp; Buscar
          </button>
          <button
            type="submit"
            onClick={() => {
              navigate('/forecasts');
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
            <FaArrowLeft /> &nbsp; Voltar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormWeather;
