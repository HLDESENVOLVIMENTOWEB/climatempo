import React from 'react';

import { FaTemperatureHigh, FaSnowflake, FaTint } from 'react-icons/fa';
import { convertData } from '../utils';

interface WeatherCardProps {
  titleTemperature: string;
  titleWindspeed: string;
  titleRelativehumidit: string;
  temperature: number | string;
  windspeed: number | string;
  relativehumidity: number | string;
  unitTemperature: string;
  unitWindspeed: string;
  unitRelativehumidity: string;
  time: string | Date;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  titleRelativehumidit,
  titleTemperature,
  titleWindspeed,
  temperature,
  windspeed,
  relativehumidity,
  unitTemperature,
  unitRelativehumidity,
  unitWindspeed,
  time,
}) => {
  return (
    <div className=" max-w-md bg-white rounded-lg border border-gray-200 shadow-md mt-4 ml-2">
      <div className="p-4">
        <div className="flex space-x-2">
          <div className="w-1/2">
            <h5 className="mb-2 text-lg  tracking-tight text-green-900">
              <FaTemperatureHigh />
              {titleTemperature}
            </h5>
          </div>
          <div className="w-1/2">
            <p className="font-normal text-center text-4xl text-green-900">{`${temperature} ${unitTemperature}`}</p>
          </div>
        </div>

        <div className="flex space-x-2 mt-2">
          <div className="w-1/2">
            <h5 className="mb-2 text-lg  tracking-tight text-green-900">
              <FaTint />
              {titleRelativehumidit}
            </h5>
            <p className="font-normal text-gray-700">{`${windspeed} ${unitRelativehumidity}`}</p>
          </div>
          <div className="w-1/2">
            <h5 className="mb-2 text-lg tracking-tight text-green-900">
              <FaSnowflake />
              {titleWindspeed}
            </h5>
            <p className="font-normal text-gray-700">{`${relativehumidity} ${unitWindspeed}`}</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mt-2 bg-green-900 rounded-b-lg py-1">
        <p className="font-normal text-white	text-center w-[100%]">{convertData(time.toString())}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
