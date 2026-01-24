import { getFoodById } from "@/app/_action/food-server";
import EditFoodForm from "./_components/edit-food-form";
import { notFound } from "next/navigation";

export default async function EditFoodPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const food = await getFoodById(id);

  if (!food) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-rose-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Edit Recipe: <span className="text-rose-600">{food.name}</span>
          </h1>
          <p className="text-lg text-slate-600">
            Update the details of your recipe below
          </p>
        </div>

        {/* Edit Form Container */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <EditFoodForm food={food} />
        </div>
      </div>
    </div>
  );
}
