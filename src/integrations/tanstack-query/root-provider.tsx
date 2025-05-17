import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds before data becomes stale
      retry: 2, // Only retry failed requests twice
      gcTime: 10 * 60 * 1000, // 10 minutes (previously called cacheTime)
      refetchOnWindowFocus: import.meta.env.PROD, // Only in production
    },
  },
});

export function getContext() {
  return {
    queryClient,
  };
}

export function Provider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
