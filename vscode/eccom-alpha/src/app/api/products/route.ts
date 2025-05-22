import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      price,
      quantity,
      isAvailable,
      offer,
      image,
      category,
      description,
      shopId,
    } = body;

    const newProduct = await db.product.create({
      data: {
        name,
        price,
        quantity,
        isAvaliable: isAvailable,
        offer,
        image,
        category,
        description,
        rating: 0,
        shopId,
      },
    });

    return NextResponse.json(newProduct);
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
