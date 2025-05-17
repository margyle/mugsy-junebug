import { createFileRoute } from '@tanstack/react-router';
import { JotaiDemo } from '../contexts/jotai/demo';

export const Route = createFileRoute('/demo/jotai')({
  component: JotaiDemoPage,
});

function JotaiDemoPage() {
  return (
    <div className="container mx-auto py-8">
      <JotaiDemo />
    </div>
  );
}
