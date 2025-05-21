// import { db } from "@/lib/prisma"
// import { notFound } from "next/navigation"

// interface ProductPageProps {
//     params: {
//         slug: string,
//         productId: string
//     }
// }

// const ProductPage = ({ params }: ProductPageProps}) => {
//     const { slug, productId } = params

//     const shop = await db.shop.findUnique({
//         where: { name: slug },
//         include: { products: true }
//     })

//     if (!shop) {
//         return (
//             notFound()
//         );
//     }

//     const product = shop.products.find(product => product.id === productId)

//     if (!product) {
//         return (
//             notFound()
//         );
//     }
//     return (
//         <div>
//             <h1>{product.name}</h1>
//             <p>{product.description}</p>
//             <p>{product.price}</p>
//         </div>
//     );
// }

// export default ProductPage;