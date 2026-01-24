import { getFoods } from "@/app/_action/food-server";
import FoodList from "@/app/food/_components/food-list";

export default async function FoodDetailPage() {
  const foods = await getFoods();

  return (
    <div className="min-h-screen bg-rose-50 p-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-800">Recipe Details</h1>
        </div>

        {/* Food List */}
        <section className="mb-12">
          <div className="mb-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">All Recipes</h2>
              <p className="mt-1 text-slate-500">
                Click on any item to see detailed information
              </p>
            </div>
            <div className="rounded-full bg-rose-100 px-6 py-3 border border-rose-200 w-50 mt-4 mb-1">
              <span className="text-md font-semibold text-rose-700">
                {foods.length} recipes available
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            {/* FoodList akan menampilkan semua recipe */}
            <FoodList foods={foods} showDetails={true} />
          </div>
        </section>
      </div>
    </div>
  );
}
