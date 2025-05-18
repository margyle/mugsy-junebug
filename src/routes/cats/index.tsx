import { createFileRoute } from '@tanstack/react-router';
import { CatList } from '@/features/cat-management';

export const Route = createFileRoute('/cats/')({
  component: CatsPage,
});

function CatsPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Cat Management</h1>
      <div className="border p-6 rounded-lg">
        <CatList />
      </div>
    </div>
  );
}
