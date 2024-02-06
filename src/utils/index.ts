import moment from 'moment';

export const convertData = (time: string) => {
  const dateString = time.toString();
  const datePart = dateString.split(' (')[0];

  return moment(datePart).locale('pt-br').format('M/DD/YYYY, h:mm:ss a');
};

export const setStorageLatLong = (latitude: string, longitude: string) => {
  localStorage.setItem('latitude', latitude);
  localStorage.setItem('longitude', longitude);
};
