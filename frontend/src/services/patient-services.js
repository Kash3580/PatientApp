import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem('token');

const headerToken = { 'x-access-token': `${token}` };

export const createPatient = async data => {
  return await axios.post(BASE_URL + '/patient', data, {
    headers: headerToken
  });
};

export const deletePatient = async data => {
  return await axios.delete(BASE_URL + '/patient', {
    data,
    headers: headerToken
  });
};

export const updatePatient = async data => {
  axios.put(BASE_URL + '/patient', data, {
    headers: headerToken
  });
};
