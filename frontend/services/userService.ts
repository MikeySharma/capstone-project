import { getCookie } from '@/app/utils/cookieHandle';
import { API_BASE_URL } from '../config';

export const userService = {
  async getProfile() {
    const token = getCookie('token');
    const response = await fetch(`${API_BASE_URL}/api/User/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  async updateProfile(data: any) {
    const token = getCookie('token');
    const response = await fetch(`${API_BASE_URL}/api/User/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
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
}; 

