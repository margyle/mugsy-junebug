import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000/api/v1/auth',
});

// Export hooks for easier use
export const { useSession, signOut } = authClient;
