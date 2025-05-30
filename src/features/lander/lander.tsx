import { CoffeeNowCard } from './coffee-now-card/coffee-now-card';
import { EverythingElseCard } from './everything-else-card/everything-else-card';

export const Lander: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-8 md:gap-6">
        <div className="md:col-start-2 md:col-span-3">
          <CoffeeNowCard />
        </div>
        <div className="md:col-start-5 md:col-span-3">
          <EverythingElseCard />
        </div>
      </div>
    </div>
  );
};
