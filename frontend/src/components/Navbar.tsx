
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useAuth } from "../hooks/useAuth";


const Navbar: React.FC = () => {
    const user = useAuthStore((s) => s.user);
    const { logout } = useAuth();


    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10 mb-4">
            <div className="text-xl font-semibold text-blue-600">Todo App</div>


            <div className="space-x-4 text-gray-700 font-medium flex items-center">
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        <span className="font-semibold text-gray-700">
                            Hi, {user.name || user.email}
                        </span>
                        <button
                            onClick={logout}
                            className="text-red-600 hover:underline ml-2"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};


export default Navbar;