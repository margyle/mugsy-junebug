import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Navbar from '../common/navbar/Navbar.tsx';

import TanStackQueryLayout from '../contexts/tanstack-query/layout.tsx';

import type { QueryClient } from '@tanstack/react-query';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
        <TanStackRouterDevtools />
        <TanStackQueryLayout />
      </main>
    </div>
  ),
});
