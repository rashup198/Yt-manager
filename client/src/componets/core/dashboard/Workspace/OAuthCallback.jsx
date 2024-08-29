import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { tokenStorage } from '../../../../services/operations/WorkspcaeAPI'; 

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const query = new URLSearchParams(window.location.search);
  const authorizationCode = query.get('code');
  const workspaceId = query.get('state');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        // Fetch the access token from Google
        const response = await axios.post('https://oauth2.googleapis.com/token', {
          code: authorizationCode,
          client_id: "1012019680651-cmh21og25lecm95urpv72uehnkf3vvv5.apps.googleusercontent.com",
          client_secret: "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",
          // redirect_uri: "http://localhost:5173/oauth-callback",
          redirect_uri: "https://yt-pri-manager.netlify.app/oauth-callback",
          grant_type: 'authorization_code',
        });

        const { access_token, refresh_token } = response.data;

        // Store the tokens using tokenStorage function
        const storageResponse = await tokenStorage(token, workspaceId, access_token, refresh_token);

        if (storageResponse) {
          toast.success('YouTube account linked successfully');
        } else {
          throw new Error('Failed to store tokens');
        }

        navigate('/dashboard/workspace/workspaces');
      } catch (error) {
        console.error('OAuth Callback Error:', error);
        toast.error(error.response?.data?.message || 'An error occurred while linking the YouTube account');
        navigate('/dashboard/workspace/workspaces'); // Navigate to workspace list on error
      }
    };

    if (authorizationCode && workspaceId) {
      fetchAccessToken();
    } else {
      toast.error('Invalid or missing authorization code');
      navigate('/dashboard/workspace/workspaces');
    }
  }, [authorizationCode, workspaceId, navigate, token]);

  return <div>Linking your YouTube account, please wait...</div>;
};

export default OAuthCallback;
