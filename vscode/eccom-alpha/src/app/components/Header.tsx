import Link from "next/link";

const Header = () => {
    return ( 
        <div className="flex items-centerjustify-between p-4">
            <h1>MY Shop</h1>
            <div className="flex gap-2">
                <Link href="/shop">inicio</Link>
                <Link href="/shop">produtos</Link>
                <Link href="/shop">contato</Link>
            </div>
        </div>
     );
}
 
export default Header;