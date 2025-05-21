// src/app/components/Header.tsx
'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between py-4 border-b mb-4">
      <h1 className="text-2xl">
        {session?.user?.name ? `Bem-vindo, ${session.user.name}
        ` : "Visitante"}
      </h1>
      <div className="flex gap-6">
        <Link href="/">Início</Link>
        <Link href="/produtos">Produtos</Link>
        <Link href={session ? "/logout" : "/login"}>{session ? "Sair" : "Entrar"}</Link>
      </div>
    </div>
  );
};

export default Header;
