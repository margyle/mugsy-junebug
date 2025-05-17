import { api } from '@/lib/api-config'

// Types
export interface Cat {
  id: string
  name: string
  type: string
  createdAt?: string
  updatedAt?: string
}

// Get all cats
export async function getCats(): Promise<Cat[]> {
  return api.get<Cat[]>('/api/v1/cats/')
}

// Get cat by ID
export async function getCatById(id: string): Promise<Cat> {
  return api.get<Cat>(`/api/v1/cats/${id}`)
}

// Create new cat
export async function createCat(
  catData: Omit<Cat, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Cat> {
  return api.post<Cat>('/api/v1/cats/', catData)
}

// Update existing cat
export async function updateCat(
  id: string,
  catData: Partial<Omit<Cat, 'id' | 'createdAt' | 'updatedAt'>>,
): Promise<Cat> {
  return api.put<Cat>(`/api/v1/cats/${id}`, catData)
}

// Delete cat
export async function deleteCat(id: string): Promise<void> {
  return api.delete(`/api/v1/cats/${id}`)
}
