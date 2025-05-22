import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    console.log("Iniciando cadastro para:", email);

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log("Email já cadastrado:", email);
      return NextResponse.json({ error: "Email já cadastrado." }, { status: 400 });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    // Validação de senha
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({ 
        error: "A senha deve ter no mínimo 8 caracteres, conter ao menos uma letra maiúscula e um número." 
      }, { status: 400 });
    }

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password, // enviando senha pura (não recomendado)
        avatarUrl: "https://i.pravatar.cc/100",
        shops: {
          create: [
            {
              name: "Loja_do_" + name,
              imageUrl: "https://i.pravatar.cc/100",
              address: "Seu endereço",
              phone: "",
            },
          ],
        },
      },
    });

    return NextResponse.json({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
