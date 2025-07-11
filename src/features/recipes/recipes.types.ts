export interface Recipe {
  id: string;
  created_by: string;
  name: string;
  description: string;
  coffee_weight: number;
  water_weight: number;
  water_temperature: number;
  grind_size: string;
  brew_time: number;
  servings: number;
  strength: 'Light' | 'Medium' | 'Dark';
  imageUrl?: string;
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
}
