import { useAuth } from "../../ContextApi/AuthContextApi";

export function Navbar() {
    const context = useAuth()
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <a className="navbar-brand mx-auto" href="/">Antique Items Auction</a>
                <a className="navbar-brand " href="/profile">Profile</a>
            </div>
        </nav>
    );
}
