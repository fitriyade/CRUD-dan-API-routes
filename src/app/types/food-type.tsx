export type FoodType = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  type?: string | null;
  ingredients: string;
  deletedAt?: Date | null;
  createdAt: Date;
};
