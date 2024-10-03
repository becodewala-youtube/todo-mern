import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-white text-3xl font-bold">ToDo App</h1>
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
                    <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
                    <FaUserCircle className="text-white text-3xl" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

