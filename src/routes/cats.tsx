import { createFileRoute } from '@tanstack/react-router'
import { CatList } from '@/features/cat-management'

export const Route = createFileRoute('/cats')({
  component: CatsPage,
})

function CatsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Cat Management</h1>
      <div className="border p-6 rounded-lg bg-white">
        <CatList />
      </div>
    </div>
  )
}
