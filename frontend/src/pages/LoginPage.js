import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/tasks');
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-md">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
