import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ShoppingCart } from "lucide-react";

interface ProductPageProps {
    params: {
        slug: string
        productId: string
    };
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { slug, productId } = params;

    const shop = await db.shop.findUnique({
        where: { name: slug },
    });

    if (!shop) {
        return notFound();
    }

    const id = parseInt(productId, 10);

    const product = await db.product.findUnique({
        where: { id },
    })

    if (!product || product.shopId !== shop.id) {
        return notFound();
    }
    return (
        <div className="flex flex-col m-auto">
            <Link href={`/${slug}`}>
                <Button variant="ghost" className="mb-4">
                    <ChevronLeft className="mr-2 h-4 w-4" /></Button></Link>
            <div className="flex flex-row gap-3">
                <div className="relative w-[300px] h-[300px] ">
                    <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-cover"
                 />
                </div>
                <div className="flex flex-col gap-3 justify-center">
                    <h1 className="text-2xl">{product.name}</h1>
                    <p className="text-sm text-gray-500 max-w-[200px]">{product.description}</p>
                    <p>{formatCurrency(product.price)}</p>
                    <Button variant="default">Adicionar ao carrinho <ShoppingCart /></Button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;