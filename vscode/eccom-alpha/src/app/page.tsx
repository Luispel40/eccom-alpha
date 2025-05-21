import { db } from "@/lib/prisma";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      rating: {
        gt: 0,
      },
    },
    orderBy: {
      rating: "desc", // mais bem avaliados primeiro
    },
    include: {
      shop: true, // para mostrar de qual loja é o produto
    },
  });
  return (
      <div>
      <h1 className="text-2xl font-bold mb-6">Produtos mais bem avaliados</h1>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow gap-6">
              <div className="relative min-w-[200px] min-h-[200px] max-w-[1000px] max-h-[1000px] ">
                <Image
                src={product.image}
                alt={product.name}
                fill
                className="mb-2 object-cover rounded-md"
              />
              </div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Loja:{" "}
                <Link
                  href={`/${product.shop.name}`}
                  className="text-blue-600 hover:underline"
                >
                  {product.shop.name}
                </Link>
              </p>
              <p className="text-yellow-600 font-medium flex items-center">
                <Star className="mr-2 h-4 w-4" />
                {product.rating}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
