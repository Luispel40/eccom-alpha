"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

interface EditionPanelProps {
    title: string;
    description: string;
    buttonText: string;
    shopId: number;
}

const EditionPanel = ({ title, description, buttonText, shopId }: EditionPanelProps) => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        quantity: '',
        isAvailable: false,
        offer: '',
        image: '',
        category: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            price: parseFloat(form.price),
            offer: parseFloat(form.offer),
            quantity: parseInt(form.quantity),
            shopId,
        };

        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert('Produto criado com sucesso!');
        } else {
            alert('Erro ao criar produto.');
        }
    };

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="default">{buttonText}</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>{description}</SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 p-4">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome do Produto"
                                value={form.name}
                                onChange={handleChange}
                                className="border rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="Valor do Produto"
                                value={form.price}
                                onChange={handleChange}
                                className="border rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Imagem do Produto"
                                value={form.image}
                                onChange={handleChange}
                                className="border rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="offer"
                                placeholder="Preço promocional"
                                value={form.offer}
                                onChange={handleChange}
                                className="border rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Categoria"
                                value={form.category}
                                onChange={handleChange}
                                className="border rounded-md p-2"
                            />
                            <textarea
                                name="description"
                                placeholder="Descrição"
                                value={form.description}
                                onChange={handleChange}
                                className="border rounded-md p-2 h-40"
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantidade"
                                value={form.quantity}
                                onChange={handleChange}
                                className="border rounded-md p-2"
                            />
                            <div className="flex items-center gap-2 justify-center">
                                <label htmlFor="isAvailable">Está disponível?</label>
                                <input
                                    type="checkbox"
                                    name="isAvailable"
                                    checked={form.isAvailable}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Salvar"
                                className="border rounded-md p-2 cursor-pointer bg-amber-300"
                            />
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default EditionPanel;
