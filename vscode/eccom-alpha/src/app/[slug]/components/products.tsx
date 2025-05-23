"use client"

import { Product } from "@prisma/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import Link from "next/link";

interface ProductsProps {
    products: Product[]
}

const Products = ({ products }: ProductsProps) => {
    const { slug } = useParams<{ slug: string }>()

    return (
        <div className="mt-4 mb-4 flex flex-col gap-3">
            <h2>Produtos da loja <span className="font-bold">{slug}</span></h2>

            <div className="flex gap-4 ">
                {products.map((product) => (

                    <div key={product.id}
                        className="flex flex-col gap-2 w-[200px] h-[400px] bg-gray-100 rounded-md overflow-hidden">
                        <div className="relative w-[200px] h-[200px] ">
                            <Image src={product.image}
                            fill
                            alt={product.name}
                            className=" object-cover"
                        />
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            <p className="font-bold">{product.name}</p>
                            <p>{formatCurrency(product.price)}</p>
                            <p className="text-sm text-gray-500  overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{product.description}</p>
                            <Link href={`/${slug}/${product.id}`}>
                                <Button className="mt-4 w-full">
                                    ver produto
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}

            </div>
        </div>);
}

export default Products;