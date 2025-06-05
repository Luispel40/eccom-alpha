"use client";

import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    image: string;
}

interface EditionPanelProps {
    title: string;
    description: string;
    buttonText: string;
    shopId: number;
    product?: Product | null;    // Produto em edição (opcional)
    onClose?: () => void;        // Função para cancelar edição
}

export default function EditionPanel({
    title,
    description,
    buttonText,
    shopId,
    product,
    onClose,
}: EditionPanelProps) {
    const [name, setName] = useState("");
    const [descriptionField, setDescriptionField] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState("");

    // Sempre que mudar o produto, preenche os campos
    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescriptionField(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setQuantity(product.quantity);
            setImage(product.image);
        } else {
            // Limpa campos ao criar novo produto
            setName("");
            setDescriptionField("");
            setPrice(0);
            setCategory("");
            setQuantity(0);
            setImage("");
        }
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...(product && { id: product.id }), // só envia o id se editar
            name,
            description: descriptionField,
            price,
            category,
            quantity,
            image,
            shopId,
            isAvailable: true,
        };

        const method = product ? "PUT" : "POST";

        const res = await fetch("/api/product", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const error = await res.json();
            alert("Erro: " + (error.error || "Falha na requisição"));
            return;
        }

        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="border rounded-md p-5 mt-5 space-y-3">
            <h2 className="font-bold">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="block w-full border rounded p-2"
                required
            />

            <input
                value={descriptionField}
                onChange={(e) => setDescriptionField(e.target.value)}
                placeholder="Descrição"
                className="block w-full border rounded p-2"
                required
            />

            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Preço"
                className="block w-full border rounded p-2"
                required
            />

            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Categoria"
                className="block w-full border rounded p-2"
                required
            />

            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Quantidade"
                className="block w-full border rounded p-2"
                required
            />

            <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="URL da Imagem"
                className="block w-full border rounded p-2"
                required
            />

            <div className="flex space-x-2">
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    {buttonText}
                </button>

                {product && onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 bg-gray-500 text-white rounded"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
