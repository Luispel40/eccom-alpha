"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import EditionPanel from "../components/edition-panel";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

interface Props {
  products: Product[];
  shopId: number;
}

export default function ProductsList({ products, shopId }: Props) {
  const [productInEdition, setProductInEdition] = useState<Product | null>(null);

  return (
    <div>
      {products.length === 0 ? (
        <div>
          <p>Nenhum produto encontrado.</p>
          <EditionPanel
            title="Novo produto"
            description="Crie um novo produto"
            buttonText="Criar produto"
            shopId={shopId}
          />
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <div
              key={product.id}
              className="mb-5 flex border rounded-md p-5"
            >
              <div className="relative w-32 h-32 rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-5 align-bottom flex justify-between w-full items-center">
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p>{product.description}</p>
                  <p>{formatCurrency(product.price)}</p>
                  <p>({product.category})</p>
                  <p>{product.quantity} em estoque</p>
                </div>
                <Button
                  variant="outline"
                  className="p-0 m-0"
                  size="sm"
                  onClick={() => setProductInEdition(product)}
                >
                  <Edit />
                </Button>
              </div>
            </div>
          ))}

          {/* Painel de edição */}
          <EditionPanel
            title={productInEdition ? "Editar produto" : "Novo produto"}
            description={
              productInEdition
                ? `Editando: ${productInEdition.name}`
                : "Crie um novo produto"
            }
            buttonText={productInEdition ? "Salvar alterações" : "Criar produto"}
            shopId={shopId}
            product={productInEdition}
            onClose={() => setProductInEdition(null)}
          />
        </div>
      )}
    </div>
  );
}
