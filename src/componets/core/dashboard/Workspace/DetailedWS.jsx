import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getWorkspaceById } from '../../../../services/operations/WorkspcaeAPI';
import toast from 'react-hot-toast';

const DetailedWS = () => {
    const { id: workspaceId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [workspaceDetails, setWorkspaceDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchWorkspaceDetails() {
            try {
                const workspaceDetails = await getWorkspaceById(token, workspaceId);
                console.log("Workspace Details:", workspaceDetails);

                if (workspaceDetails) {
                    setWorkspaceDetails(workspaceDetails);
                }
            } catch (error) {
                toast.error('Failed to fetch workspace details');
                navigate('/dashboard/workspace/workspaces');
            }
        }
        fetchWorkspaceDetails();
    }, [token, workspaceId, navigate]);

    if (!workspaceDetails) {
        return <p className="text-center text-richblack-100">Loading workspace details...</p>;
    }

    return (
        <div className="container mx-auto p-4 max-w-maxContent bg-richblack-800 text-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-caribbeangreen-200">{workspaceDetails.name}</h1>
            <p className="text-lg mb-4 text-richblack-100">{workspaceDetails.description}</p>
            <p className="text-sm text-richblack-400">
                Created At: {new Date(workspaceDetails.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-richblack-400">
                Updated At: {new Date(workspaceDetails.updatedAt).toLocaleDateString()}
            </p>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2 text-richblue-100">Editors</h2>
                <ul className="list-disc list-inside text-richblack-100">
                    {workspaceDetails.editors.map((editor) => (
                        <li key={editor._id} className="mb-1">
                            {editor.firstName} {editor.lastName} <span className="text-caribbeangreen-100">({editor.email})</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2 text-richblue-100">Videos</h2>
                <ul className="list-disc list-inside text-richblack-100">
                    {workspaceDetails.videos.length > 0 ? (
                        workspaceDetails.videos.map((video) => (
                            <li key={video._id} className="mb-1">
                                {video.title} - <span className="text-caribbeangreen-100">Uploaded on {new Date(video.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))
                    ) : (
                        <li className="text-richblack-200">No videos available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DetailedWS;
