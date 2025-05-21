
export default function AuthErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Erro na autenticação</h1>
      <p>Houve um problema durante o login.</p>
      {searchParams.error && <p className="text-red-600">Erro: {searchParams.error}</p>}
    </div>
  );
}
