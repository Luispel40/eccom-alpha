import { Button } from "@/components/ui/button"
import { db } from "@/lib/prisma"
import Image from "next/image"
import { notFound } from "next/navigation"
import Products from "./components/products"

interface ShopPageProps {
    params: {
        slug: string
    }
}

const ShopPage = async ({ params }: ShopPageProps) => {
    const { slug } = params
    const shop = await db.shop.findUnique({
        where: { name: slug },
        include: { products: true }
    })
    if (!shop) {
        return (
            notFound()
        );
    }
    return (
        <div>
            <div className="flex gap-4">
                <Image
                    src={shop.imageUrl}
                    height={50}
                    width={50}
                    alt={shop.name}
                    className="rounded-full bg-cover"
                />
                <div className="flex flex-col gap-2">
                    <h1>{shop.name}</h1>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{shop.address}</p>
                    <p>{shop.phone}</p>
                </div>
            </div>
            <Products products={shop.products} />
            <Button className="">Todos os produtos</Button>
        </div>
    );
}

export default ShopPage;