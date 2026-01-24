import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Ambil semua makanan yang tidak di-soft-delete

export async function GET() {
  try {
    const foods = await prisma.food.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        type: true,
        imageUrl: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: foods,
      message: "Foods fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Tambah food baru

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, type, ingredients, imageUrl } = body;

    // Validasi sederhana
    if (!name || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and description are required",
        },
        { status: 400 },
      );
    }

    const food = await prisma.food.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        type: type?.trim(),
        ingredients: ingredients?.trim() || "",
        imageUrl: imageUrl?.trim() || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: food,
        message: "Food created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating food:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
