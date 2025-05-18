import { createFileRoute } from '@tanstack/react-router';
import { JotaiDemo } from '../../contexts/jotai/demo';

export const Route = createFileRoute('/examples/jotai')({
  component: JotaiDemoPage,
});

function JotaiDemoPage() {
  return (
    <div className="mx-auto py-8">
      <JotaiDemo />
    </div>
  );
}
