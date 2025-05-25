import { createFileRoute } from '@tanstack/react-router';
import { RecipeList } from '@/features/recipes';
import { mockRecipes } from '@/data/mock-recipes';

export const Route = createFileRoute('/recipes/')({
  component: RecipesPage,
});

function RecipesPage() {
  // TODO: update type from any to Recipe when we bring back that feature set
  const handleRecipeClick = (recipe: any) => {
    console.log('Recipe clicked:', recipe);
    // TODO: Navigate to recipe detail page
  };

  return (
    <div className="w-full space-y-8">
      <RecipeList recipes={mockRecipes} onRecipeClick={handleRecipeClick} />
    </div>
  );
}
