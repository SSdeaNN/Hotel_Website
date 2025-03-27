// src/app/services/authService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });
      
      // Suponiendo que la respuesta contiene un token
      return response.data.token;
    } catch (error) {
      // Manejo de errores similar al anterior
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error de respuesta:', error.response.data);
          console.error('Código de estado:', error.response.status);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor');
        } else {
          console.error('Error al configurar la solicitud:', error.message);
        }
      } else {
        console.error('Error desconocido:', error);
      }
      throw error;
    }
  }
};