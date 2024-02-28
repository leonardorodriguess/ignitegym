import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.0.13:3333'
});


api.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if(error.response && error.response.data) {
    console.log(error)
    return Promise.reject(new Error(error.response.data.message));
  }else {
    console.log(error)
    return Promise.reject(error);
  }
});

export {api}