import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllWorkspaces, deleteWorkspace } from '../../../../services/operations/WorkspcaeAPI';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import toast from 'react-hot-toast';


export default function WorkspaceList() {
    const { token } = useSelector((state) => state.auth);
    const [response, setResponse] = useState({ data: [] });


    useEffect(() => {
        async function loadWorkspaces() {
            const apiResponse = await getAllWorkspaces(token);
            // console.log("this is my api response", apiResponse);

            if(apiResponse){
                setResponse(apiResponse); 
            }else{
                // console.log("Something went wrong");
                toast.error("Something went wrong")  
            }
        }
        loadWorkspaces();
    }, [token]);

    console.log("this is my api response 2222", response);
    console.log("The length of the data is", response.length)



    return (
        <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-extrabold text-richblack-400 mb-6">My Workspaces</h1>
            <div className="flex flex-col gap-6">
                {response.length > 0 ? (
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {response.map((workspace) => (
                            <div className="">
                            <li key={workspace._id} className="bg-white p-5 rounded-lg shadow-lg flex gap-4 justify-between items-center transition-transform transform hover:scale-105">
                                <Link to={`/dashboard/workspace/workspace/${workspace._id}`} className="text-xl font-bold text-richblack-800 hover:text-blue-500">
                                    {workspace.name}
                                </Link>
                                
                            </li>
                        </div>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">No workspaces found.</p>
                )}
            </div>
            <div className="mt-10 flex justify-center">
                <Link to="/dashboard/workspace/create" className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-transform transform hover:scale-105">
                    <AiOutlinePlus size={24} />
                    <span className="text-lg font-semibold">Create New Workspace</span>
                </Link>
            </div>
        </div>
    );
}
