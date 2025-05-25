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
      {/* Fixed navbar on mobile, normal on desktop */}
      <div className="md:relative md:z-auto fixed top-0 left-0 right-0 z-50 md:static">
        <Navbar />
      </div>

      {/* Main content with top padding on mobile to account for fixed navbar */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:pt-6 pt-20">
        <Outlet />
        {/* <TanStackRouterDevtools />
        <TanStackQueryLayout /> */}
      </main>
    </div>
  ),
});
