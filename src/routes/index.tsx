import { createFileRoute } from '@tanstack/react-router';
import { CatList } from '@/features/cat-management';
import logo from '../logo.svg';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return <div className="text-center">Hello</div>;
}
