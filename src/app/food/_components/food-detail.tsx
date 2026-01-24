"use client";

import { useEffect, useState } from "react";
import type { FoodType } from "@/app/types/food-type";
import { getFoodById } from "@/app/_action/get-food-server";

interface FoodDetailModalProps {
  foodId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function FoodDetailModal({
  foodId,
  isOpen,
  onClose,
}: FoodDetailModalProps) {
  const [foodDetail, setFoodDetail] = useState<FoodType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !foodId) {
      setFoodDetail(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    getFoodById(foodId)
      .then(setFoodDetail)
      .catch(() => setError("Failed to load food details"))
      .finally(() => setLoading(false));
  }, [isOpen, foodId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white">
        <div className="p-6">
          {/* Close button modal */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-lg text-gray-800 hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-8 w-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-2"></div>
              <span className="text-gray-600 text-sm">Loading...</span>
            </div>
          )}

          {/* CONTENT */}
          {foodDetail && (
            <div className="space-y-6">
              {foodDetail.deletedAt && (
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <p className="text-red-600 text-sm">
                    This food has been deleted
                  </p>
                </div>
              )}

              {/* Nama */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Nama Menu</h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-800 font-medium">{foodDetail.name}</p>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Deskripsi</h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-700">
                    {foodDetail.description || "Tidak ada deskripsi"}
                  </p>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Ingredients
                </h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg w-full min-h-20 max-h-64 overflow-auto whitespace-pre-line">
                  <p className="text-gray-800 font-medium">
                    {foodDetail.ingredients || "Tidak ada ingredients"}
                  </p>
                </div>
              </div>

              {/* Type */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Type Of Food
                </h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-800 font-medium">{foodDetail.type}</p>
                </div>
              </div>

              {/* Image */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Image URL</h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-800 font-medium">
                    {foodDetail.imageUrl}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && !foodDetail && (
            <p className="text-center text-gray-600 py-8">
              Tidak ada data resep makanan
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
