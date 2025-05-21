"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro no cadastro.");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error("Erro inesperado:", err);
      setError("Erro inesperado ao cadastrar.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl mb-4 font-bold">Cadastro</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-800">
          Cadastrar
        </button>
      </form>
      <p className="mt-4">
        Ja possui uma conta? <Link href="/login">Entrar</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
