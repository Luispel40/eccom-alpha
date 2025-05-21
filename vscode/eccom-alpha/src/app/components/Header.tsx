// src/app/components/Header.tsx
'use client';

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between py-4 border-b mb-4">
      <h1 className="text-2xl">
        {session?.user?.name ? `Bem-vindo, ${session.user.name}
        ` : "Visitante"}
      </h1>
      <div className="flex gap-6">
        <Link className="hover:bg-gray-500 hover:text-gray-100 p-1 rounded-xs" href="/">Início</Link>
        <Link className="hover:bg-gray-500 hover:text-gray-100 p-1 rounded-xs" href="/produtos"><User /></Link>
        {session ? (
          <Button className="hover:bg-gray-500 hover:text-gray-100 p-1 rounded-xs" onClick={() => signOut()}><LogOut /></Button>
        ) : (
          <Link className="hover:bg-gray-500 hover:text-gray-100 p-1 rounded-xs" href="/login"><LogIn /></Link>
        )}
      </div>
    </div>
  );
};

export default Header;
