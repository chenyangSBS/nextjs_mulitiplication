import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.52.244:8099',
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
});

export default instance;