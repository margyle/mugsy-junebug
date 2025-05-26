import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Coffee, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatTime } from '@/utils/helpers';

export const CoffeeNowCard: React.FC = () => {
  const [isBrewing, setIsBrewing] = useState(false);

  const handleClick = () => {
    setIsBrewing(!isBrewing);
    console.log('Status:', !isBrewing ? 'Brewing' : 'Not Brewing');
  };

  return (
    <Card
      className={`w-full cursor-pointer transition-all duration-300 shadow-lg
        hover:shadow-xl
         ${isBrewing ? 'border-success/25' : 'hover:bg-50'}`}
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
        <div className="text-6xl font-medium flex flex-col items-start font-bebas">
          <span>{isBrewing ? 'Brewing' : 'Coffee'}</span>
          <span>{isBrewing ? 'Now' : 'Now'}</span>
        </div>

        <Separator className="my-4 w-full" />

        <div className="space-y-2 w-full">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-4 text-primary flex-shrink-0" />
            <span className="text-sm">Brew time: {formatTime(4)}</span>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-5 w-4 text-primary flex-shrink-0" />
            <span className="text-sm">Serves: {1}</span>
          </div>
          <div className="flex items-start gap-2">
            <Coffee className="h-5 w-4 text-primary flex-shrink-0" />
            <span className="text-sm">Method: {'Pour Over'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
