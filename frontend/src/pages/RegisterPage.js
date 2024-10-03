import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', { name, email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/tasks');
        } catch (error) {
            console.error('Error registering', error);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-md">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;