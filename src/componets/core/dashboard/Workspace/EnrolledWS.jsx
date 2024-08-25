import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllWorkspacesForEditor } from '../../../../services/operations/WorkspcaeAPI';
import { Link } from 'react-router-dom';
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
        
        <div className="p-4 md:p-6 lg:p-8 bg-richblack-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-caribbeangreen-200">Enrolled Workspaces</h1>
            <div className="space-y-6 flex flex-col gap-4">
                {workspaces.length > 0 ? (
                    workspaces.map((workspace) => (
                      <Link to={`/dashboard/workspace/workspaceEditor/${workspace._id}`}>
                        <div key={workspace._id} className="p-6 bg-richblack-800 shadow-lg rounded-lg gap-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                            <div className="text-white">
                                <h2 className="text-2xl font-semibold mb-2 text-caribbeangreen-100">{workspace.name}</h2>
                                <p className="text-richblack-100 mb-2">{workspace.description}</p>
                                <p className="text-sm text-richblack-400">Created At: {new Date(workspace.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex space-x-4">
                                <Link to={`/dashboard/workspace/workspaceEditor/${workspace._id}`} className="text-caribbeangreen-200 hover:underline">
                                    View Details
                                </Link>
                            </div>
                        </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-pure-greys-300">No workspaces available.</p>
                )}
            </div>
        </div>
    );
};

export default EnrolledWS;
