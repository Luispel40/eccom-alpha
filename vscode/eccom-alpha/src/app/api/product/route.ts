import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Recebido POST /api/product");
    const data = await req.json();

    const newProduct = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        quantity: data.quantity,
        image: data.image,
        shopId: data.shopId,
        isAvaliable: true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json({ error: "Erro ao criar produto." }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { params } = await context;
  const { id } = params;

  try {
    console.log("Recebido GET /api/product");
    const product = await db.product.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json({ error: "Erro ao buscar produto." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    console.log("Recebido PUT /api/product");
    const data = await req.json();

    if (!data.id) {
      return NextResponse.json({ error: "ID do produto não fornecido" }, { status: 400 });
    }

    const updatedProduct = await db.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        quantity: data.quantity,
        image: data.image,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Erro no PUT:", error);
    return NextResponse.json({ error: "Erro ao atualizar produto." }, { status: 500 });
  }
}

