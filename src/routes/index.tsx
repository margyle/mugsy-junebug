import { createFileRoute } from '@tanstack/react-router';
import { Lander } from '@/features/lander/lander';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return <Lander />;
}
