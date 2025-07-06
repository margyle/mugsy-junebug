import { createFileRoute } from '@tanstack/react-router';
import { Login } from '@/features/login';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login isMobile={false} />;
}
