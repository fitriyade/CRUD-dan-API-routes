"use server";

import prisma from "@/lib/prisma";
import type { FoodType } from "../types/food-type";
import { revalidatePath } from "next/cache";

// GET ALL FOODS
export async function getFoods(): Promise<FoodType[]> {
  const foods: FoodType[] = await prisma.food.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });

  return foods;
}
// GET FOOD BY ID
export async function getFoodById(id: string) {
  const food = await prisma.food.findUnique({
    where: { id },
  });
  return food;
}

// CREATE FOOD
export async function createFood(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const type = formData.get("type") as string | null;
  const ingredients = formData.get("ingredients") as string;

  if (!name || !description || !ingredients) {
    throw new Error("Name, description, and ingredients are required");
  }

  const food = await prisma.food.create({
    data: { name, description, imageUrl, type, ingredients },
  });

  revalidatePath("/food");
  return food;
}

// UPDATE FOOD
export async function updateFood(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const type = formData.get("type") as string | null;
  const ingredients = formData.get("ingredients") as string;

  if (!name || !description || !ingredients) {
    throw new Error("Name, description, and ingredients are required");
  }

  const food = await prisma.food.update({
    where: { id },
    data: { name, description, imageUrl, type, ingredients },
  });

  revalidatePath("/food");
  return food;
}

// DELETE FOOD (soft delete)
export async function deleteFood(id: string) {
  const food = await prisma.food.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/food");
  return food;
}
