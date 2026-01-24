import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// types for params
export type Params = Promise<{ id: string }>;

// Get a single food by ID

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Tunggu params selesai resolve
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Food ID is required",
        },
        { status: 400 },
      );
    }

    const food = await prisma.food.findUnique({
      where: { id },
    });

    if (!food) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: "Food not found",
        },
        { status: 404 },
      );
    }

    // Hanya kembalikan jika tidak soft-deleted
    if (food.deletedAt) {
      return NextResponse.json(
        {
          success: false,
          error: "Deleted",
          message: "Food has been deleted",
          data: food,
        },
        { status: 410 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: food,
        message: "Food fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching food:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch food",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

//Update a food by ID

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Food ID is required",
        },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { name, description } = body;

    const existingFood = await prisma.food.findUnique({ where: { id } });
    if (!existingFood || existingFood.deletedAt) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad request",
          message: "Cannot update non-existing or deleted food",
        },
        { status: 400 },
      );
    }

    if (!name && !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          message: "At least one field (name or description) is required",
        },
        { status: 400 },
      );
    }

    const updateData: { name?: string; description?: string } = {};
    if (name) updateData.name = name.trim();
    if (description) updateData.description = description.trim();

    const food = await prisma.food.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      {
        success: true,
        data: food,
        message: "Food updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating food:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update food",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Soft delete a food by ID

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Food ID is required",
        },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get("hard") === "true";

    const existingFood = await prisma.food.findUnique({ where: { id } });
    if (!existingFood) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: "Food not found",
        },
        { status: 404 },
      );
    }

    let food;

    if (hardDelete) {
      food = await prisma.food.delete({ where: { id } });
      return NextResponse.json(
        {
          success: true,
          data: food,
          message: "Food permanently deleted",
        },
        { status: 200 },
      );
    } else {
      if (existingFood.deletedAt) {
        return NextResponse.json(
          {
            success: false,
            error: "Bad request",
            message: "Food is already deleted",
          },
          { status: 400 },
        );
      }

      food = await prisma.food.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      return NextResponse.json(
        {
          success: true,
          data: food,
          message: "Food soft deleted successfully",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete food",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Restore a soft-deleted food

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Food ID is required",
        },
        { status: 400 },
      );
    }

    const existingFood = await prisma.food.findUnique({ where: { id } });
    if (!existingFood || !existingFood.deletedAt) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad request",
          message: "Food is not deleted or does not exist",
        },
        { status: 400 },
      );
    }

    const food = await prisma.food.update({
      where: { id },
      data: { deletedAt: null },
    });

    return NextResponse.json(
      {
        success: true,
        data: food,
        message: "Food restored successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error restoring food:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to restore food",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
