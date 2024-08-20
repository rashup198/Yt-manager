import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createWorkspace } from '../../../../services/operations/WorkspcaeAPI';

export default function CreateWorkspace() {
    const { token } = useSelector(state => state.auth);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createWorkspace(token, { name, description });
        if (response.success) {
            navigate('/dashboard/workspace/workspaces');
        } else {
            console.error('Failed to create workspace');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-richblack-900">
            <div className="bg-richblack-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Workspace</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="workspace-name" className="block text-sm font-medium mb-2">Workspace Name</label>
                        <input
                            id="workspace-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-richblack-700 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter workspace name"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-richblack-700 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter workspace description"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
