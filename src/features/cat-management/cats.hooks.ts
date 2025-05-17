import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  type Cat,
  getCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
} from './cats.api'

// Hook for fetching all cats
export function useCatsList() {
  return useQuery({
    queryKey: ['cats'],
    queryFn: getCats,
  })
}

// Hook for fetching a single cat by ID
export function useCatDetails(id: string) {
  return useQuery({
    queryKey: ['cats', id],
    queryFn: () => getCatById(id),
    staleTime: 30000,
    enabled: !!id, // Only run the query if we have an ID
  })
}

// Hook for creating a cat
export function useCreateCat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCat,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cats'] })
    },
    onError: (error) => {
      // Log error or show notification
      console.error('Failed to create cat:', error)
    },
  })
}

// Hook for updating a cat
export function useUpdateCat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Omit<Cat, 'id' | 'createdAt' | 'updatedAt'>>
    }) => updateCat(id, data),
    onSuccess: (_, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['cats'] })
      queryClient.invalidateQueries({ queryKey: ['cats', variables.id] })
    },
    onError: (error) => {
      console.error('Failed to update cat:', error)
    },
  })
}

// Hook for deleting a cat with optimistic updates
export function useDeleteCat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCat,
    onMutate: async (catId) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['cats'] })

      // Snapshot the previous value
      const previousCats = queryClient.getQueryData(['cats'])

      // Optimistically update to new value
      queryClient.setQueryData(['cats'], (old: Cat[] = []) =>
        old.filter((cat) => cat.id !== catId),
      )

      // Return context for rollback on error
      return { previousCats }
    },
    onError: (err, catId, context) => {
      // If mutation fails, roll back to previous state
      queryClient.setQueryData(['cats'], context?.previousCats)
      console.error('Failed to delete cat:', err)
    },
    onSettled: () => {
      // Always invalidate to make sure we're in sync with server
      queryClient.invalidateQueries({ queryKey: ['cats'] })
    },
  })
}
