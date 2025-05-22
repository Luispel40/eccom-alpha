import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const userId = Number(id);
    if (isNaN(userId)) {
      return Response.json({ error: "ID inválido" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      include: { shops: true },
    });

    if (!user) {
      return Response.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error("Erro na API de buscar usuário:", error);
    return Response.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
