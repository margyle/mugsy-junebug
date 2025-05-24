import CoffeeNowCard from './coffee-now-card/coffee-now-card';

export const Lander: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-6">
        <div className="md:col-start-2 md:col-span-2">
          <CoffeeNowCard />
        </div>
        <div className="md:col-start-4 md:col-span-2">
          <CoffeeNowCard />
        </div>
      </div>
    </div>
  );
};
