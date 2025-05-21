// /app/api/user/[id]/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const user = await db.user.findUnique({
    where: { id: Number(params.id) },
    include: {
      shops: true,
    },
  });

  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  return NextResponse.json(user);
}
