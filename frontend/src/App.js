import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/tasks" element={<TaskPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
