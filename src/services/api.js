import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = {
  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { 
        name, 
        email, 
        password 
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Registration failed');
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { 
        email, 
        password 
      });
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Login failed');
    }
  },

  getUsers: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch users');
    }
  },

  blockUsers: async (userIds) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/users/block`, 
        { userIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to block users');
    }
  },

  deleteUsers: async (userIds) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/users/delete`, 
        { userIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to delete users');
    }
  }
};

export default api;