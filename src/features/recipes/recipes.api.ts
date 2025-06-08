import { api } from '@/lib/api-config';
import type { Recipe } from './recipes.types';

export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    console.log('Fetching recipes...');
    const response = await api.get<Recipe[]>('recipes');
    console.log('Recipes response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipesByUserId = async (userId: string): Promise<Recipe[]> => {
  try {
    console.log('Fetching recipes...');
    const response = await api.get<Recipe[]>(`recipes/${userId}`);
    console.log('Recipes response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// // Get cat by ID
// export const getCat = async (id: string): Promise<Cat> => {
//   const response = await api.get<Cat>(`cats/${id}`);
//   return response.data;
// };

// // Create new cat
// export const createCat = async (cat: Omit<Cat, 'id'>): Promise<Cat> => {
//   const response = await api.post<Cat>('cats', cat);
//   return response.data;
// };

// // Update existing cat
// export const updateCat = async (id: string, cat: Partial<Cat>): Promise<Cat> => {
//   const response = await api.put<Cat>(`cats/${id}`, cat);
//   return response.data;
// };

// // Delete cat
// export const deleteCat = async (id: string): Promise<void> => {
//   await api.delete(`cats/${id}`);
// };
