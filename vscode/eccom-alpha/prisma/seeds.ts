/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("../src/generated/prisma");


const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    // Limpa os dados antigos
    await tx.product.deleteMany();
    await tx.shop.deleteMany();
    await tx.user.deleteMany();

    // Cria um usuário
    const user = await tx.user.create({
      data: {
        email: "admin@ecommerce.com",
        name: "Luis eccomerce",
        password: "securepassword123", // Em produção, nunca armazene senha em texto puro!
        avatarUrl: "https://i.pravatar.cc/300",
      },
    });

    // Cria uma loja
    const shop = await tx.shop.create({
      data: {
        name: "Tech Store",
        address: "123 Tech Avenue, Silicon Valley",
        phone: "+1 234 567 890",
        imageUrl: "https://via.placeholder.com/600x400.png?text=Tech+Store",
        userId: user.id,
      },
    });

    // Cria produtos
    await tx.product.createMany({
      data: [
        {
          name: "Smartphone X100",
          price: 999.99,
          quantity: 50,
          isAvaliable: true,
          offer: 10.0, // 10% de desconto
          image: "https://via.placeholder.com/300x300.png?text=Smartphone+X100",
          category: "Smartphones",
          description: "O mais novo Smartphone X100 com câmera de 108MP.",
          rating: 4.5,
          shopId: shop.id,
        },
        {
          name: "Laptop Pro 15",
          price: 1999.99,
          quantity: 30,
          isAvaliable: true,
          offer: 5.0, // 5% de desconto
          image: "https://via.placeholder.com/300x300.png?text=Laptop+Pro+15",
          category: "Laptops",
          description: "Laptop Pro 15 com processador M3 e 32GB RAM.",
          rating: 4.8,
          shopId: shop.id,
        },
        {
          name: "Fone Bluetooth Z",
          price: 199.99,
          quantity: 100,
          isAvaliable: true,
          offer: 15.0, // 15% de desconto
          image: "https://via.placeholder.com/300x300.png?text=Fone+Bluetooth+Z",
          category: "Fones de Ouvido",
          description: "Fone Bluetooth Z com cancelamento ativo de ruído.",
          rating: 4.3,
          shopId: shop.id,
        },
        {
          name: "Smartwatch S",
          price: 299.99,
          quantity: 75,
          isAvaliable: true,
          offer: 0.0, // Sem desconto
          image: "https://via.placeholder.com/300x300.png?text=Smartwatch+S",
          category: "Smartwatches",
          description: "Smartwatch S com monitoramento cardíaco e GPS.",
          rating: 4.6,
          shopId: shop.id,
        },
      ],
    });
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
