import { createFileRoute } from '@tanstack/react-router';
import { Login } from '@/features/login';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  validateSearch: (search) => ({
    mobile: search.mobile as boolean | undefined,
  }),
});

function RouteComponent() {
  return <Login />;
}
