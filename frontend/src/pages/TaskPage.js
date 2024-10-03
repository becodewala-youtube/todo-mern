import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    
    // Fetch tasks on page load
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const addTask = async () => {
        try {
            const response = await axios.post('/api/tasks', { task: newTask }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks([...tasks, response.data]);
            setNewTask('');
        } catch (error) {
            console.error('Error adding task', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            const response = await axios.put(`/api/tasks/${id}`, { completed: !completed }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(tasks.map(task => task._id === id ? response.data : task));
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-8">
            <h2 className="text-2xl font-bold text-center mb-4">Your Tasks</h2>
            
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    onClick={addTask}
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600 shadow-md"
                >
                    Add Task
                </button>
            </div>
            
            <ul>
                {tasks.map(task => (
                    <li key={task._id} className="flex justify-between items-center bg-white shadow-md mb-4 p-4 rounded-md">
                        <span
                            onClick={() => toggleComplete(task._id, task.completed)}
                            className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                        >
                            {task.task}
                        </span>
                        <button
                            onClick={() => deleteTask(task._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskPage;
