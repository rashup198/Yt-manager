import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllWorkspacesForEditor } from '../../../../services/operations/WorkspcaeAPI';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import toast from 'react-hot-toast';

const EnrolledWS = () => {
    const { token } = useSelector((state) => state.auth);
    const [workspaces, setWorkspaces] = useState([]);

    useEffect(() => {
        async function loadWorkspacesForEditor() {
            try {
                const apiResponse = await getAllWorkspacesForEditor(token);
                console.log(apiResponse);

                if (apiResponse && Array.isArray(apiResponse)) {
                    setWorkspaces(apiResponse);
                } else {
                    console.log("Something went wrong");
                    toast.error("Something went wrong");
                }
            } catch (error) {
                console.error("Error loading workspaces:", error);
                toast.error("Failed to load workspaces.");
            }
        }
        loadWorkspacesForEditor();
    }, [token]);


    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-pure-greys-300">Enrolled Workspaces</h1>
            <div className="space-y-4">
                {workspaces.length > 0 ? (
                    workspaces.map((workspace) => (
                        <div key={workspace._id} className="p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{workspace.name}</h2>
                                <p className="text-gray-600 mb-2">{workspace.description}</p>
                                <p className="text-sm text-gray-500">Created At: {new Date(workspace.createdAt).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">Updated At: {new Date(workspace.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex space-x-4">
                                <Link to={`/workspace/${workspace._id}`} className="text-blue-500 hover:underline">
                                    View Details
                                </Link>
                                
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-pure-greys-300">No workspaces available.</p>
                )}
            </div>
           
        </div>
    );
};

export default EnrolledWS;
