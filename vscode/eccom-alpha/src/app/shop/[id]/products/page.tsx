// app/shop/[id]/products/page.tsx
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { useSession as session } from "next-auth/react";
import Image from "next/image";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit } from "lucide-react";
import Link from "next/link";

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
        },
    });

    if (!shop || !session) return notFound();

    return (
        <div>
            <div className="flex">
                <Link href="/panel" className="mb-5"><ChevronLeft /></Link>
            <h1 className="font-bold mb-5">Produtos da loja: {shop.name}</h1>
            </div>
            {shop.products.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <div>
                    {shop.products.map((product) => (
                        <div key={product.id} className="mb-5 flex border rounded-md p-5">
                            <div className="relative w-32 h-32 rounded-xl">
                                <Image src={product.image} alt={product.name} fill
                                    className="object-cover" />
                            </div>
                            <div className="ml-5 align-bottom flex justify-between w-full items-center">
                                <div>
                                    <p className="font-bold">{product.name}</p>
                                    <p>{product.description}</p>
                                    <p>{formatCurrency(product.price)}</p>
                                    <p>({product.category})</p>
                                    <p>{product.quantity} em estoque</p>
                                </div>
                                <Button variant="outline" className="p-0 m-0" size="sm"><Edit /></Button>
                            </div>
                        </div>
                    ))}
                    <Button>Add Product</Button>
                </div>
            )}
        </div>
    );
}
