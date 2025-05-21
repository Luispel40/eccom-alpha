import Link from "next/link";

const Login = () => {
    return (<div className="flex flex-col gap-4 h-[80vh]">
        <h1>Login</h1>
        <form action="login" className="flex flex-col gap-4 w-[300px] m-auto">
            <input type="text" placeholder="Digite seu email" className="border p-2 rounded-md" />
            <input type="password" placeholder="Digite sua senha" className="border p-2 rounded-md" />
            <Link href="/Daniel_eletronics" className="bg-black text-gray-100 p-2 rounded-md">Entrar</Link>
        </form>
    </div>);
}

export default Login;