"use client";

import { deleteFood } from "@/app/_action/food-server";
import type { FoodType } from "@/app/types/food-type";
import Link from "next/link";
import { useState } from "react";
import FoodDetailModal from "./food-detail";

interface FoodListProps {
  foods: FoodType[];
  showDetails?: boolean;
}

export default function FoodList({
  foods,
  showDetails = false,
}: FoodListProps) {
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure want to delete this recipe?")) return;
    try {
      await deleteFood(id);
    } catch (error) {
      console.error("Failed to delete food:", error);
      alert("Failed to delete food");
    }
  };

  const handleFoodClick = (foodId: string) => {
    if (showDetails) {
      setSelectedFoodId(foodId);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="mt-6">
        {foods.length === 0 ? (
          <div className="text-center py-16 text-slate-500 rounded-2xl bg-rose-50 border border-rose-200">
            <p className="text-xl font-medium text-slate-700">
              No recipes available
            </p>
            <p className="text-base mt-2">Start by adding your first recipe!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map((food) => (
              <div
                key={food.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition-all ${
                  showDetails
                    ? "border-rose-200 hover:border-rose-300 cursor-pointer"
                    : "border-slate-200"
                }`}
                onClick={() => showDetails && handleFoodClick(food.id)}
              >
                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800">
                    {food.name}
                  </h3>
                  <p className="mt-2 text-slate-600 line-clamp-2">
                    {food.description}
                  </p>
                </div>

                {/* Date */}
                <div className="mb-6 text-sm text-slate-400">
                  <span>
                    {food.createdAt
                      ? new Date(food.createdAt).toLocaleDateString()
                      : "No date"}
                  </span>
                </div>

                {/* Actions or Detail Indicator */}
                {showDetails ? (
                  <div className="text-center">
                    <button className="w-full rounded-xl bg-rose-100 text-rose-700 py-3 text-base font-medium hover:bg-rose-200 transition-colors">
                      View Details
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href={`/food/edit/${food.id}`}
                      className="flex-1 text-center rounded-xl border border-slate-300 text-slate-700 py-3 text-base font-medium hover:bg-slate-50 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        handleDelete(food.id);
                      }}
                      className="flex-1 rounded-xl border border-rose-300 text-rose-600 py-3 text-base font-medium hover:bg-rose-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showDetails && selectedFoodId && (
        <FoodDetailModal
          foodId={selectedFoodId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
