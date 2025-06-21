import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import RecipeCard from '../recipe-card/recipe-card';
import type { Recipe } from '../recipes.types';
import { useGetAllRecipes } from '../recipes.hooks';

interface RecipeListProps {
  onRecipeClick?: (recipe: Recipe) => void;
}

export default function RecipeList({ onRecipeClick }: RecipeListProps) {
  const { data: recipesList = [], isLoading, isError, error } = useGetAllRecipes();

  if (isLoading) return <div className="py-8 text-center">Loading recipes</div>;

  if (recipesList.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-muted-foreground">No recipes found</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile: Simple vertical stack */}
      <div className="md:hidden px-0">
        <div className="space-y-6">
          {recipesList.map((recipe) => (
            <div key={recipe.id} className="overflow-visible">
              <RecipeCard recipe={recipe} onClick={onRecipeClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Mugsy and desktop: Horizontal carousel */}
      <div className="hidden md:block">
        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full max-w-5xl mx-auto -mt-4"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>

          <CarouselContent>
            {recipesList.map((recipe) => (
              <CarouselItem
                key={recipe.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 mb-6 overflow-visible"
              >
                <RecipeCard recipe={recipe} onClick={() => onRecipeClick?.(recipe)} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
