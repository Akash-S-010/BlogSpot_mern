import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuthStore();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const getLinkClass = (path) => 
        location.pathname === path ? "text-yellow-200" : "hover:text-yellow-200 transition";

    return (
        <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-blue-950 text-white shadow-md fixed w-full z-[2]">
            <Link to="/" className="text-xl font-bold">BlogSpot</Link>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 md:space-x-8">
                <Link className={getLinkClass("/")} to="/">Home</Link>
                <Link className={getLinkClass("/create")} to="/create">Create Blog</Link>
                <Link className={getLinkClass("/profile")} to="/profile">Profile</Link>
                {isAuthenticated ? (
                    <button className="bg-red-500 px-4 py-1 hover:bg-red-600 transition rounded" onClick={logout}>Logout</button>
                ) : (
                    <Link to="/login" className="bg-green-500 px-4 py-1 hover:bg-green-600 transition rounded">Login</Link>
                )}
            </div>

            {/* Mobile Sliding Menu */}
            <div className={`fixed top-0 right-0 h-full bg-blue-950 text-white w-64 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden shadow-lg p-5`}> 
                <button className="text-2xl absolute top-5 right-5" onClick={() => setIsOpen(false)}>
                    <FiX />
                </button>
                <div className="flex flex-col space-y-4 mt-10">
                    <Link className={getLinkClass("/")} to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link className={getLinkClass("/create")} to="/create" onClick={() => setIsOpen(false)}>Create Blog</Link>
                    <Link className={getLinkClass("/profile")} to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                    {isAuthenticated ? (
                        <button className="bg-red-500 px-4 py-1 hover:bg-red-600 transition rounded" onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
                    ) : (
                        <Link to="/login" className="bg-green-500 px-4 py-1 hover:bg-green-600 transition rounded" onClick={() => setIsOpen(false)}>Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
