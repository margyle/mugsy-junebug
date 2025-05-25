import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import RecipeCard from '../recipe-card/recipe-card';
import type { Recipe } from '../recipe-card/recipe-card';

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeClick?: (recipe: Recipe) => void;
}

export default function RecipeList({ recipes, onRecipeClick }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-muted-foreground">No recipes found</p>
      </div>
    );
  }

  return (
    <div className="w-full">
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

        <CarouselContent className="-ml-4">
          {recipes.map((recipe, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 mb-6">
              <RecipeCard recipe={recipe} onClick={onRecipeClick} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
