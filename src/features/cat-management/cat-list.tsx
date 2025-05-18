import { Button } from '@/components/ui/button';
import { useCatsList, useCreateCat, useDeleteCat } from './cats.hooks';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CatList() {
  // Use individual hooks
  const { data: cats = [], isLoading, isError, error } = useCatsList();

  const { mutate: createCat, isPending: isCreating, error: createError } = useCreateCat();

  const { mutate: deleteCat, isPending: isDeleting, error: deleteError } = useDeleteCat();

  const [isAddingCat, setIsAddingCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState('persian');

  if (isLoading) return <div className="py-8 text-center">Loading cats...</div>;

  if (isError) {
    return (
      <div className="py-8 text-center">
        <div className="text-red-500 mb-2">Error loading cats</div>
        <div className="text-sm text-gray-600">{error?.message || 'Unknown error occurred'}</div>
      </div>
    );
  }

  const handleAddCat = () => {
    if (newCatName.trim()) {
      createCat({
        name: newCatName.trim(),
        type: newCatType,
      });
      setNewCatName('');
      setIsAddingCat(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Cats</h2>
        <Button size="sm" onClick={() => setIsAddingCat(true)} disabled={isAddingCat}>
          Add Cat
        </Button>
      </div>

      {createError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
          Failed to create cat: {createError.message || 'Unknown error'}
        </div>
      )}

      {deleteError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
          Failed to delete cat: {deleteError.message || 'Unknown error'}
        </div>
      )}

      {isAddingCat && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add New Cat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter cat name"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="type">
                  Type
                </label>
                <Select value={newCatType} onValueChange={setNewCatType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cat type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="persian">Persian</SelectItem>
                    <SelectItem value="siamese">Siamese</SelectItem>
                    <SelectItem value="maine coon">Maine Coon</SelectItem>
                    <SelectItem value="bengal">Bengal</SelectItem>
                    <SelectItem value="ragdoll">Ragdoll</SelectItem>
                    <SelectItem value="nugget">Nugget</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => setIsAddingCat(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddCat}
                  disabled={isCreating || !newCatName.trim()}
                >
                  {isCreating ? 'Adding...' : 'Add Cat'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="border rounded-md">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left font-medium">Name</th>
              <th className="p-3 text-left font-medium">Type</th>
              <th className="p-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{cat.name}</td>
                <td className="p-3 capitalize">{cat.type}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isDeleting}
                      onClick={() => deleteCat(cat.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {cats.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-muted-foreground">
                  No cats found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
