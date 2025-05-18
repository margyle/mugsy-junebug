import { createFileRoute } from '@tanstack/react-router';
import { Lander } from '@/features/lander/lander';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return <Lander title="Hello" items={['item1', 'item2', 'item3']} />;
}
