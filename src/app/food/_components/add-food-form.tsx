"use client";

import { useState } from "react";
import FoodForm from "./food-form";

export default function AddProductForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-10">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-3 rounded-xl border border-rose-500 bg-rose-500 px-7 py-4 text-base font-semibold text-white hover:bg-rose-600 transition-colors shadow-md hover:shadow-lg"
        >
          <span className="text-xl leading-none">+</span>
          Add New Recipe
        </button>
      ) : (
        <div className="rounded-2xl bg-white shadow-lg border border-rose-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rose-100 px-8 py-6 bg-rose-50 rounded-t-2xl">
            <div>
              <p className="text-base text-slate-600 mt-1">
                Create a new food recipe
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-slate-600 hover:text-slate-800 hover:bg-rose-100 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <FoodForm mode="create" onCancel={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
