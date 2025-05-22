import { Button } from "@/components/ui/button"
import { db } from "@/lib/prisma"
import Image from "next/image"
import { notFound } from "next/navigation"
import Products from "./components/products"
import { ChevronsRight, PhoneIcon } from "lucide-react"

interface ShopPageProps {
    params: {
        slug: string
    }
}

const ShopPage = async ({ params }: ShopPageProps) => {
    const { slug } = params
    const shop = await db.shop.findUnique({
        where: { name: slug },
        include: { 
            products: true,
            user: true
         }
    })
    if (!shop) {
        return (
            notFound()
        );
    }
    return (
        <div>
            <div className="flex gap-4">
                <div className="relative w-[100px] h-[100px] ">
                    <Image
                    src={shop.imageUrl}
                    fill
                    alt={shop.name}
                    className="rounded-full object-cover"
                />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">@{shop.name}</h1>
                    <p>{shop.user.email}</p>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{shop.address}</p>
                    <p className="flex items-center"><PhoneIcon className="mr-2 h-4 w-4" />{shop.phone}</p>
                </div>
            </div>
            <Products products={shop.products} />
            <Button className="">Todos os produtos <ChevronsRight className="ml-2 h-4 w-4" /></Button>
        </div>
    );
}

export default ShopPage;