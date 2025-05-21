

const LogoutPage = () => {
    if (typeof window !== "undefined") window.location.href = "/";

    return ( <div>
        <h1>Logout</h1>
    </div> );
}
 
export default LogoutPage;