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
    <div className="container mx-auto">
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </div>
  ),
});
