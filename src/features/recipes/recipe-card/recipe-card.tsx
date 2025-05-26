import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Coffee } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  brewTime: number; // in minutes
  servings: number;
  strength: 'Light' | 'Medium' | 'Dark';
  imageUrl?: string;
  tags: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const handleClick = () => {
    onClick?.(recipe);
  };

  // TODO: add theme colors for these
  const getStrengthColor = (strength: Recipe['strength']) => {
    switch (strength) {
      case 'Light':
        return 'text-green-600 bg-green-50';
      case 'Medium':
        return 'text-orange-600 bg-orange-50';
      case 'Dark':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  return (
    <Card
      className="w-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
    >
      <CardContent className="p-4 relative flex flex-col items-start text-left">
        {/* Title Section */}
        <div className="text-4xl font-medium flex flex-col items-start font-bebas mb-2">
          <span>{recipe.title}</span>
        </div>

        {/* Strength Badge and Tags */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStrengthColor(recipe.strength)}`}
          >
            {recipe.strength}
          </div>
          {recipe.tags.slice(1, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <Separator className="my-2 w-full" />

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{recipe.description}</p>

        {/* Recipe Info */}
        <div className="space-y-2 w-full">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-4 text-primary flex-shrink-0" />
            <span className="text-sm">Brew time: {formatTime(recipe.brewTime)}</span>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-5 w-4 text-primary flex-shrink-0" />
            <span className="text-sm">Serves: {recipe.servings}</span>
          </div>
          <div className="flex items-start gap-2">
            <Coffee className="h-5 w-4 text-primary flex-shrink-0" />
            <span className="text-sm">Method: {recipe.tags[0] || 'Pour Over'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
