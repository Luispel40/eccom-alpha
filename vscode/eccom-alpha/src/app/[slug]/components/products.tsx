"use client"

import { Product } from "@prisma/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
    products: Product[]
}

const Products = ({ products }: ProductsProps) => {
    const { slug } = useParams<{ slug: string }>()
    
    return (
        <div className="mt-4 mb-4 flex flex-col">
            <h2>Produtos da loja {slug}</h2>

            <div className="flex gap-4 ">
                {products.map((product) => (

                    <div key={product.id}
                        className="flex flex-col gap-2 w-[200px] h-[400px] bg-gray-100 rounded-md overflow-hidden">
                        <Image src={product.image}
                            width={200}
                            height={200}
                            alt={product.name}
                            className=" max-w-[200px] max-h-[200px] min-w-[200px] min-h-[200px] bg-cover"
                        />
                        <div className="flex flex-col gap-2 p-2">
                            <p>{product.name}</p>
                        <p>{formatCurrency(product.price)}</p>
                        <p className="text-sm text-gray-500  overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{product.description}</p>
                        <Button className="mt-4"
                        onClick={() => window.location.href = `/${slug}/${product.id}`}>
                            ver produto
                        </Button>
                        </div>
                    </div>
                ))}

            </div>
        </div>);
}

export default Products;