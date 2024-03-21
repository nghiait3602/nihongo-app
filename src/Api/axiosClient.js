import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'http://192.168.0.189:8000/',
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };
  return config;
});
axiosClient.interceptors.response.use(
  (res) => {
    if (res.data) {
      return res.data;
    }
    throw new Error('Error');
  },
  (error) => {
    console.log(`Error api ${error}`);
    throw new Error('Error');
  }
);

export default axiosClient;
