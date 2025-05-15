import { db } from "@/lib/prisma"

interface ShopPageProps {
    params: {
        slug: string
    }
}

const ShopPage = async ({ params }: ShopPageProps) => {
    const { slug } =  params
    const shop = await db.shop.findUnique({
        where: {
            name: slug
        }
    })
    if (!shop) {
        return (
            <div> 
                <h1>Loja não encontrada</h1>
            </div>
        );
    }
    return (
        <div> 
            <h1>{slug}</h1>
        </div>
    );
}

export default ShopPage;