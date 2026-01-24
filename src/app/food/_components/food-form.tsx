"use client";

import { createFood, updateFood } from "@/app/_action/food-server";
import type { FoodType } from "@/app/types/food-type";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FoodFormProps {
  mode: "create" | "edit";
  food?: FoodType;
  onCancel?: () => void;
}

export default function FoodForm({ mode, food, onCancel }: FoodFormProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (
        !formData.get("name")?.toString().trim() ||
        !formData.get("description")?.toString().trim()
      ) {
        alert("Please fill all required fields");
        setLoading(false);
        return;
      }

      if (mode === "create") {
        await createFood(formData);
        alert("Food created successfully");
        router.refresh();
        onCancel?.();
      } else {
        if (!food?.id) throw new Error("Food ID is required for update");
        await updateFood(food.id, formData);
        alert("Food updated successfully");
        router.push("/food");
        router.refresh();
      }
    } catch (error) {
      console.error(`Failed to ${mode} food:`, error);
      alert(
        `Failed to ${mode} food: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-rose-100">
      {/* Header */}
      <div className="border-b border-rose-100 px-8 py-6 bg-rose-50 rounded-t-2xl">
        <h2 className="text-2xl font-bold text-slate-800">
          {mode === "create" ? "Add New Recipe" : "Edit Recipe"}
        </h2>
        <p className="text-base text-slate-600 mt-2">
          {mode === "create"
            ? "Fill the form to create a new recipe"
            : "Update the information below"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Menu Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={food?.name || ""}
            placeholder="e.g. Fried Rice"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-black focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors placeholder:text-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            defaultValue={food?.description || ""}
            placeholder="About the food"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-black focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors placeholder:text-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            required
            rows={4}
            defaultValue={food?.ingredients || ""}
            placeholder="Ingredients list"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-black focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors placeholder:text-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Type of Food
          </label>
          <input
            id="type"
            name="type"
            type="text"
            required
            defaultValue={food?.type || ""}
            placeholder="UPF / Fresh"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-black focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors placeholder:text-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            required
            defaultValue={food?.imageUrl || ""}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-black focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors placeholder:text-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 text-base rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 text-base font-medium rounded-xl bg-rose-500 text-white hover:bg-rose-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
                ? "Create Recipe"
                : "Update Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
}
