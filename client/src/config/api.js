// API configuration for different environments
// In production (Render), use the environment variable that points to the backend service
// In development, use relative path since both run on same origin via proxy or concurrently
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

console.log('API_URL configured as:', API_URL);

export default API_URL;