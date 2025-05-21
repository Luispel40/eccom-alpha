import Link from "next/link";

const Header = () => {
    return ( 
        <div className="flex items-center justify-between py-4 border-b mb-4">
            <h1 className="text-2xl">MY Shop</h1>
            <div className="flex gap-6">
                <Link href="../" className="hover:bg-black hover:text-gray-100 p-2">inicio</Link>
                <Link href="./login" className="hover:bg-black hover:text-gray-100 p-2">produtos</Link>
                <Link href="../" className="hover:bg-black hover:text-gray-100 p-2">contato</Link>
            </div>
        </div>
     );
}
 
export default Header;