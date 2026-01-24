import { getFoods } from "../_action/food-server";
import AddFoodForm from "./_components/add-food-form";
import FoodList from "./_components/food-list";

export default async function FoodPage() {
  const foods = await getFoods();

  return (
    <div className="min-h-screen bg-rose-50 p-16">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-800">Recipes</h1>
          <p className="mt-2 text-lg text-slate-600">
            Manage your food recipes here
          </p>
        </div>

        {/* Add Form */}
        <div className="mb-12 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-slate-800">
            Add New Recipe
          </h2>
          <AddFoodForm />
        </div>

        {/* Food List */}
        <section className="mb-12">
          <div className="mb-8 flex items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Food Recipe List
              </h2>
            </div>
            <div className="rounded-full bg-rose-100 px-6 py-3 border border-rose-200">
              <span className="text-lg font-semibold text-rose-700">
                {foods.length} {foods.length === 1 ? "recipe" : "recipes"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <FoodList foods={foods} />
          </div>
        </section>
      </div>
    </div>
  );
}
