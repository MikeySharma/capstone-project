// 'use server'
import { deleteCookie } from '@/app/utils/cookieHandle';
import { API_BASE_URL } from '../config';
import axios from 'axios';

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegisterData) {
    const response = await fetch(`${API_BASE_URL}/api/Auth/Register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  },

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    return {
      token: data.token,
      name: data.name,
      email: data.email
    };
  },

  async forgotPassword(email: string) {
    const response = await fetch(`${API_BASE_URL}/api/Auth/ForgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  },

  async verifyOtp(email: string, otp: string) {
    const response = await fetch(`${API_BASE_URL}/api/Auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  },

  logout() {
    deleteCookie('token');
  }
};

export const isLoggedIn = async (token: string) => {
  try {

    const response = await fetch(`${API_BASE_URL}/api/Auth/validate-token`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }

}
