import { createFileRoute } from '@tanstack/react-router';
import { RecipeList, type Recipe } from '@/features/recipes';
import { mockRecipes } from '@/data/mock-recipes';
import { toast } from 'sonner';

export const Route = createFileRoute('/recipes/')({
  component: RecipesPage,
});

function RecipesPage() {
  // TODO: update type from any to Recipe when we bring back that feature set
  const handleRecipeClick = (recipe: Recipe) => {
    console.log('Recipe clicked:', recipe);
    toast.success(`${recipe.name} added to your list`, {
      style: {
        border: '1px solid var(--purps)',
      },
    });
    // TODO: Navigate to recipe detail page
  };

  return (
    <div className="w-full space-y-8">
      <RecipeList recipes={mockRecipes} onRecipeClick={handleRecipeClick} />
    </div>
  );
}
