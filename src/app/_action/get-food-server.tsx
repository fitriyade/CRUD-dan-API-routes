import type { FoodType } from "@/app/types/food-type";

export async function getFoodById(foodId: string): Promise<FoodType | null> {
  try {
    const response = await fetch(`/api/foods/${foodId}`);
    const result = await response.json();

    if (result.success) {
      return result.data as FoodType;
    }

    console.warn("Failed to fetch food:", result.message);
    return null;
  } catch (error) {
    console.error("Error fetching food:", error);
    return null;
  }
}
