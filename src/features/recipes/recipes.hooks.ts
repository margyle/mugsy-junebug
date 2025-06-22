import { useQuery } from '@tanstack/react-query';
import { getRecipes } from './recipes.api';

export function useGetAllRecipes() {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });
}
