import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CoffeeNowCard() {
  const [isBrewing, setIsBrewing] = useState(false);

  const handleClick = () => {
    setIsBrewing(!isBrewing);
    console.log('Status:', !isBrewing ? 'Brewing' : 'Not Brewing');
  };

  return (
    <Card
      className={`w-full cursor-pointer transition-all duration-300 shadow-lg
        hover:shadow-xl border-2
        border-primary/25 ${isBrewing ? 'border-success/25' : 'hover:bg-50'}`}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      aria-pressed={isBrewing}
    >
      <CardContent className="p-4 relative flex flex-col items-start text-left">
        <div className="text-7xl font-medium flex flex-col items-start font-bebas">
          <span>{isBrewing ? 'Brewing' : 'Coffee'}</span>
          <span>{isBrewing ? 'Now' : 'Now'}</span>
        </div>

        <Separator className="my-4 w-full" />

        <div className="space-y-2 w-full">
          <div className="flex items-start gap-2">
            <Heart className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
            <span>Recipe: Junebug</span>
          </div>
          <div className="flex items-start gap-2">
            <Heart className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
            <span>Recipe: Junebug</span>
          </div>
          <div className="flex items-start gap-2">
            <Heart className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
            <span>Recipe: Junebug</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
