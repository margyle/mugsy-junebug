import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getUserPreferences,
  createUserPreferences,
  updateUserPreferences,
} from './user-preferences.api';
import type { UserPreferencesForm } from './user-preferences.types';

const QUERY_KEY = ['user-preferences'];

export function useGetUserPreferences() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getUserPreferences,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateUserPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Preferences created successfully');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to create preferences';
      toast.error(message);
    },
  });
}

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Preferences updated successfully');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update preferences';
      toast.error(message);
    },
  });
}
