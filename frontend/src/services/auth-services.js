import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const loginService = async data => {
  return await axios.post(`${BASE_URL}/login`, data);
};
