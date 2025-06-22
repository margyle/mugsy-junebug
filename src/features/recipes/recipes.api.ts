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
