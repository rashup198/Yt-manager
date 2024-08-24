import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const VideoUpload = ({ workspaceId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isEditor, setIsEditor] = useState(false);

  // Get the user's role from the Redux store
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Check if the user is an Editor
    if (user && user.role === 'Editor') {
      setIsEditor(true);
    }
  }, [user]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert('Please select a video file to upload.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', videoFile);

      const response = await axios.post(`/api/videos/upload/${workspaceId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Video uploaded successfully');
        setTitle('');
        setDescription('');
        setVideoFile(null);
      } else {
        alert('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('An error occurred while uploading the video.');
    } finally {
      setUploading(false);
    }
  };

  if (!isEditor) {
    return <p className="text-center text-red-500 mt-4">You do not have permission to upload videos. Only editors can upload Videos</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-richblack-900 text-yellow-50">
      <div className="w-full max-w-lg p-8 bg-richblack-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-yellow-300 mb-6 text-center">Upload a Video</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full text-black mt-1 p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-black mt-1 p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="videoFile" className="block text-sm font-medium text-gray-300">Choose a video:</label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 bg-yellow-500 rounded-md text-gray-900 font-semibold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>

    
  );
};

export default VideoUpload;
