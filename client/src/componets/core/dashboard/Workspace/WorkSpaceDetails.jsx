import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkspaceById, deleteWorkspace, inviteEditor } from '../../../../services/operations/WorkspcaeAPI';
import { approveVideo, rejectVideo } from '../../../../services/operations/videoAPI';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import toast from 'react-hot-toast';

const WorkSpaceDetails = () => {
  const { id: workspaceId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [workspace, setWorkspace] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchWorkspaceDetails() {
      try {
        const workspaceDetails = await getWorkspaceById(token, workspaceId);
        if (workspaceDetails) {
          setWorkspace(workspaceDetails);
        }
      } catch (error) {
        toast.error('Failed to fetch workspace details');
        navigate('/dashboard/workspace/workspaces');
      }
    }
    fetchWorkspaceDetails();
  }, [token, workspaceId, navigate]);

  const handleDelete = async () => {
    try {
      const deleteResponse = await deleteWorkspace(token, workspaceId);
      if (deleteResponse.success) {
        toast.success("Workspace deleted successfully");
        navigate('/dashboard/workspace/workspaces');
      } else {
        toast.error("Failed to delete workspace");
      }
    } catch (error) {
      toast.error('An error occurred during deletion');
    }
  };

  const handleLinkYouTubeChannel = () => {
    const clientId = "1012019680651-cmh21og25lecm95urpv72uehnkf3vvv5.apps.googleusercontent.com";
    // const redirectUri = "http://localhost:5173/oauth-callback";
    const redirectUri = "https://streamline-yt.netlify.app/oauth-callback";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/youtube.upload&access_type=offline&prompt=consent&state=${workspaceId}`;

    window.location.href = authUrl;
  };

  const handleInviteEditor = async () => {
    setIsLoading(true);
    try {
      const inviteResponse = await inviteEditor(token, workspaceId, email);
      if (inviteResponse.success) {
        toast.success('Invitation sent successfully');
        setEmail('');
        setShowInviteForm(false); 
      } else {
        toast.error('Failed to send invitation');
      }
    } catch (error) {
      toast.error('An error occurred while sending the invitation');
    }
    setIsLoading(false);
  };

  const handleApproveVideo = async (videoId) => {
    try {
      await dispatch(approveVideo(token, workspaceId, videoId));
      toast.success('Video approved successfully');
    } catch (error) {
      toast.error('Failed to approve video');
    }
  };

  const handleRejectVideo = async (videoId) => {
    try {
      await dispatch(rejectVideo(token, workspaceId, videoId));
      toast.success('Video rejected successfully');
    } catch (error) {
      toast.error('Failed to reject video');
    }
  };

  if (!workspace) {
    return <div>Loading...</div>;
  }

  const members = workspace.editors || [];
  const isYouTubeLinked = workspace.youtubeAccessToken && workspace.youtubeRefreshToken;
  const videos = workspace.videos || [];

  return (
    <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-richblack-400 mb-6">{workspace.name}</h1>
      <p className="text-lg text-gray-600 mb-6">{workspace.description || 'No description available.'}</p>

      {isYouTubeLinked ? (
        <div className="mb-6 p-4 bg-caribbeangreen-500 border-l-4 border-green-500 text-green-700">
          <p>YouTube channel linked successfully!</p>
          <p className="text-sm">You can now upload videos directly to the linked YouTube channel.</p>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p>No YouTube channel linked.</p>
          <p className="text-sm">Link a YouTube channel to start uploading videos.</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-richblack-400">Editors</h2>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={() => setShowInviteForm(!showInviteForm)} 
        >
          Add Editor
        </button>
      </div>

      {/* Invite Editor Form */}
      {showInviteForm && (
        <div className="mb-6 p-4 bg-blue-500 rounded-lg shadow-md transition-transform transform scale-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Add an Editor</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowInviteForm(false)}
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter editor's email"
            className="border rounded-lg p-2 w-full mb-4 text-black"
          />
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            onClick={handleInviteEditor}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Editor'}
          </button>
        </div>
      )}

      {members.length > 0 ? (
        <ul className="grid gap-4">
          {members.map((member) => (
            <li key={member._id} className="flex justify-between items-center bg-blue-400 p-4 rounded-lg shadow-md">
              <span className="text-lg text-white">{member.firstName} {member.lastName}</span>
              <span className="text-sm text-gray-500">{member.role}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No members found.</p>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-richblack-400 mb-4">Videos</h2>

        {videos.length > 0 ? (
          <ul className="grid gap-4">
            {videos.map((video) => (
              <li key={video._id} className="bg-richblue-500 p-4 rounded-lg shadow-md w-full">
                <div className="flex flex-col justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{video.title}</h3>
                    <p className="text-gray-300">{video.description || 'No description available.'}</p>
                  </div>
                  <video
                    className="mt-4 w-full rounded-lg"
                    controls
                    src={video.url}
                    type="video/mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                    onClick={() => handleApproveVideo(video._id)}
                  >
                    Approve
                  </button>
                  <button 
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                    onClick={() => handleRejectVideo(video._id)}
                  >
                    Reject
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">Uploaded on: {new Date(video.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No videos found.</p>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          onClick={handleDelete}
        >
          <AiOutlineDelete className="inline-block mr-2" />
          Delete Workspace
        </button>
        {!isYouTubeLinked && (
          <button 
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
            onClick={handleLinkYouTubeChannel}
          >
            Link YouTube Channel
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkSpaceDetails;
