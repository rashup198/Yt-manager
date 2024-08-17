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
    return <p>You do not have permission to upload videos.</p>;
  }

  return (
    <div className="video-upload">
      <h2>Upload a Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoFile">Choose a video:</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
