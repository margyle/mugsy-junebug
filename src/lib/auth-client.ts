import { createAuthClient } from 'better-auth/react';

const API_BASE_URL = import.meta.env.VITE_DECAF_API_BASE_URL;

export const authClient = createAuthClient({
  baseURL: `${API_BASE_URL}/auth`,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
});

// Export hooks for easier use
export const { useSession, signOut } = authClient;
