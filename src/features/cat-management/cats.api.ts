import { api } from '@/lib/api-config';
import type { Cat } from './cats.types';

// Get all cats
export const getCats = async (): Promise<Cat[]> => {
  try {
    console.log('Fetching cats...');
    const response = await api.get<Cat[]>('cats');
    console.log('Cats response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching cats:', error);
    throw error;
  }
};

// Get cat by ID
export const getCat = async (id: string): Promise<Cat> => {
  const response = await api.get<Cat>(`cats/${id}`);
  return response.data;
};

// Create new cat
export const createCat = async (cat: Omit<Cat, 'id'>): Promise<Cat> => {
  const response = await api.post<Cat>('cats', cat);
  return response.data;
};

// Update existing cat
export const updateCat = async (id: string, cat: Partial<Cat>): Promise<Cat> => {
  const response = await api.put<Cat>(`cats/${id}`, cat);
  return response.data;
};

// Delete cat
export const deleteCat = async (id: string): Promise<void> => {
  await api.delete(`cats/${id}`);
};
