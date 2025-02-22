import { Link } from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-blue-950 text-white shadow-md fixed w-full z-[2]">
            <Link to="/" className="text-xl font-bold">BlogSpot</Link>

            <div className="space-x-4 md:space-x-8">
                <Link className="text-yellow-200 " to="/">Home</Link>
                <Link className="hover:text-yellow-200 transition " to="/create">Create Blog</Link>
                <Link className="hover:text-yellow-200 transition " to="/profile">Profile</Link>
                {isAuthenticated ? (
                    <button className="bg-red-500 px-4 py-1 hover:bg-red-600 transition rounded" onClick={logout}>Logout</button>
                ) : (
                    <Link to="/login" className="bg-green-500 px-4 py-1 hover:bg-green-600 transition rounded">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
