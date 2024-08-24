import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getWorkspaceById, deleteWorkspace } from '../../../../services/operations/WorkspcaeAPI';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../../componets/common/ConfirmationModal';

const WorkSpaceDetails = () => {
  const { id: workspaceId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [workspace, setWorkspace] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null); 
  const navigate = useNavigate();  

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

  const handleDelete = (workspaceId) => {
    setConfirmationModal({
      text1: 'Confirm Deletion',
      text2: 'Are you sure you want to delete this workspace? This action cannot be undone.',
      btn1Text: 'Delete',
      btn2Text: 'Cancel',
      btn1Handler: async () => {
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
        setConfirmationModal(null);
      },
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleLinkYouTubeChannel = () => {
    const clientId = "1012019680651-cmh21og25lecm95urpv72uehnkf3vvv5.apps.googleusercontent.com";
    const redirectUri = "http://localhost:5173/oauth-callback";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/youtube.upload&access_type=offline&prompt=consent&state=${workspaceId}`;

    window.location.href = authUrl;
  };

  if (!workspace) {
    return <div>Loading...</div>;
  }

  const members = workspace.editors || [];
  const isYouTubeLinked = workspace.youtubeAccessToken && workspace.youtubeRefreshToken;

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
        <h2 className="text-2xl font-bold text-richblack-400">Members</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
          Invite Members
        </button>
      </div>

      {members.length > 0 ? (
        <ul className="grid gap-4">
          {members.map((member) => (
            <li key={member._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
              <span className="text-lg text-richblack-800">{member.name}</span>
              <span className="text-sm text-gray-500">{member.role}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No members found.</p>
      )}

      <div className="mt-10 flex gap-4">
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105">
          <AiOutlineEdit size={20} />
          Edit Workspace
        </button>
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          onClick={() => handleDelete(workspace._id)}
        >
          <AiOutlineDelete size={20} />
          Delete Workspace
        </button>

        {/* added the condit */}
        {
          isYouTubeLinked ? <div className=""></div> : <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={handleLinkYouTubeChannel}
          disabled={isYouTubeLinked}
        >
          
        </button>
        }
        
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default WorkSpaceDetails;
