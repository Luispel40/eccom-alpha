"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PanelPage = () => {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        if (session?.user?.id) {
            fetch(`/api/user/${session.user.id}`)
                .then((res) => res.json())
                .then((data) => setUserData(data));
        }
    }, [session?.user?.id]);

    if (status === "loading" || !userData) return <p>Carregando...</p>;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between border-b"><p>Email: {userData.email}</p>
                <Button variant="ghost">
                    <Edit />
                </Button></div>
            <div className="flex justify-between border-b"><p>nome: {userData.name}</p>
                <Button variant="ghost">
                    <Edit />
                </Button></div>
            <p>Loja(s):</p>
            <div>
                {userData.shops.map((shop: any) => {
                    return <div key={shop.id} className="flex justify-between border-b items-center p-6 gap-6">
                        <div className="relative w-[200px] h-[200px]">
                            <Image src={shop.imageUrl} alt={shop.name} fill 
                            className="rounded-md object-cover"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>@{shop.name} </p>
                            <p>{shop.address}</p>
                            <p>{shop.phone}</p>
                            <Link href={`/shop/${shop.id}/products`}><Button>Ver produtos</Button></Link>
                        </div>
                        <div className="flex gap-2 flex-row">
                            <button><Edit /></button>
                        </div>

                    </div>
                })}
            </div>
        </div>
    );
};

export default PanelPage;
