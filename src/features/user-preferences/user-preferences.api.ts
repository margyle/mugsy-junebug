import { api } from '@/lib/api-config';
import type { UserPreferences, UserPreferencesForm } from './user-preferences.types';

const API_ENDPOINT = 'user-preferences';

export const getUserPreferences = async (): Promise<UserPreferences | null> => {
  try {
    const response = await api.get<UserPreferences>(API_ENDPOINT);
    return response.data;
  } catch (error: any) {
    // Return null if preferences don't exist (404)
    if (error?.response?.status === 404) {
      return null;
    }
    console.error('Error fetching user preferences:', error);
    throw error;
  }
};

export const createUserPreferences = async (
  preferences: UserPreferencesForm
): Promise<UserPreferences> => {
  try {
    const response = await api.post<UserPreferences>(API_ENDPOINT, preferences);
    return response.data;
  } catch (error) {
    console.error('Error creating user preferences:', error);
    throw error;
  }
};

export const updateUserPreferences = async (
  updates: Partial<UserPreferencesForm>
): Promise<UserPreferences> => {
  try {
    const response = await api.put<UserPreferences>(API_ENDPOINT, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};
