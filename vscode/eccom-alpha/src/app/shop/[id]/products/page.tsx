import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductsList from "../../components/products-list";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductsPage({ params }: Props) {
  const shopId = Number(params.id);
  const shop = await db.shop.findUnique({
    where: { id: shopId },
    include: {
      products: true,
      user: true,
    },
  });

  if (!shop) return notFound();

  return (
    <div>
      <div className="flex">
        <Link href="/panel" className="mb-5">
          <ChevronLeft />
        </Link>
        <h1 className="font-bold mb-5">Produtos da loja: {shop.name}</h1>
      </div>
      <ProductsList products={shop.products} shopId={shopId} />
    </div>
  );
}
