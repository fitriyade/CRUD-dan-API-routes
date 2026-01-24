"use client";
import type { FoodType } from "@/app/types/food-type";
import FoodForm from "@/app/food/_components/food-form";

export default function EditFoodForm({ food }: { food: FoodType }) {
  return <FoodForm mode="edit" food={food} />;
}
