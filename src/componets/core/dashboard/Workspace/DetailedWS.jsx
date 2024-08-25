import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkspaceById } from '../../../../services/operations/WorkspcaeAPI';
import { uploadVideo, deleteVideo } from '../../../../services/operations/videoAPI';
import toast from 'react-hot-toast';

const DetailedWS = () => {
    const { id: workspaceId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [workspaceDetails, setWorkspaceDetails] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title || !description) {
            toast.error('Please provide all required fields');
            return;
        }

        try {
            await dispatch(uploadVideo(token, workspaceId, file, title, description));
            toast.success('Video uploaded successfully');
            setShowUploadForm(false);
            const updatedWorkspaceDetails = await getWorkspaceById(token, workspaceId);
            setWorkspaceDetails(updatedWorkspaceDetails);
        } catch (error) {
            toast.error('Failed to upload video');
        }
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            await dispatch(deleteVideo(token, videoId));
            toast.success('Video deleted successfully');
            const updatedWorkspaceDetails = await getWorkspaceById(token, workspaceId);
            setWorkspaceDetails(updatedWorkspaceDetails);
        } catch (error) {
            toast.error('Failed to delete video');
        }
    };

    const toggleUploadForm = () => setShowUploadForm(!showUploadForm);

    if (!workspaceDetails) {
        return <p className="text-center text-richblack-100">Loading workspace details...</p>;
    }

    return (
        <div className="container mx-auto w-[500px] p-4 bg-richblack-800 text-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-caribbeangreen-200">{workspaceDetails.name}</h1>
            <p className="text-lg mb-4 text-richblack-100">{workspaceDetails.description}</p>
            <p className="text-sm text-richblack-400">
                Created At: {new Date(workspaceDetails.createdAt).toLocaleDateString()}
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
                            <li key={video._id} className="mb-1 flex items-center justify-between">
                                <span>{video.title} - <span className="text-caribbeangreen-100">Uploaded on {new Date(video.createdAt).toLocaleDateString()}</span></span>
                                <button
                                    onClick={() => handleDeleteVideo(video._id)}
                                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <div>
                            <li className="text-richblack-200">No videos available</li>
                            <button
                                className="mt-4 px-4 py-2 bg-caribbeangreen-500 text-white rounded hover:bg-caribbeangreen-600"
                                onClick={toggleUploadForm}
                            >
                                {showUploadForm ? 'Close Upload Form' : 'Upload Video'}
                            </button>
                        </div>
                    )}
                </ul>
            </div>

            {showUploadForm && (
                <div className="mt-6 p-4 bg-richblack-700 text-white rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="file" className="block text-sm font-medium text-gray-300">Video File</label>
                            <input
                                type="file"
                                id="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full text-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-caribbeangreen-500 text-white rounded hover:bg-caribbeangreen-600"
                        >
                            Upload
                        </button>
                        <button
                            type="button"
                            onClick={toggleUploadForm}
                            className="ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DetailedWS;
