import axios from 'axios';
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import {workSpaceEndPoints} from '../api'
import { useNavigate } from 'react-router-dom';

// const invite ="http://localhost:5000/api/workspace/workspaces/"
const invite ="https://yt-manager.onrender.com/api/workspace/workspaces/"
// Base URL of your API
// const API_BASE_URL = 'http://localhost:5000/api'; 
const API_BASE_URL= 'https://yt-manager.onrender.com'
const {
    CREATE_WORKSPACE,
    GET_ALL_WORKSPACE,
    GET_ALL_WORKSPACE_FOR_EDITOR,
    GET_WORKSPACE_BY_ID,
    UPDATE_WORKSPACE_DETAILS,
    DELETE_WORKSPACE, // delete request
    INVITE_EDITOR,
    TOKEN_STORAGE_URL
}= workSpaceEndPoints
// Create a workspace
export const createWorkspace = async (token, workspaceData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/workspace/workspaces`,
            workspaceData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const getAllWorkspaces = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];  
    try {
        const response = await apiConnector("GET", GET_ALL_WORKSPACE, null, {
            Authorization: `Bearer ${token}`, 
        });
        
        if (!response?.data?.success) {
            throw new Error("Could not fetch the workspaces");
        }
        
        result = response?.data?.workspaces; 
        // console.log(result);
        
    } catch (error) {
        // console.log("Get all workspaces API ERROR:", error);
        toast.error(error.message || "Failed to load workspaces"); 
    } finally {
        toast.dismiss(toastId); 
    }
    
    return result;
};


export const getAllWorkspacesForEditor = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_ALL_WORKSPACE_FOR_EDITOR, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("There was an error. Try again.");
        }

        result = response?.data?.workspaces;
        // console.log("This is workspace data:", result);

    } catch (error) {
        console.error("There was an error getting all workspaces for editors:", error);
        toast.error(error.message || "Failed to load workspaces.");
    } finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const getWorkspaceById = async (token, workspaceId) => {
    const tokenId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector("GET", `${GET_WORKSPACE_BY_ID}/${workspaceId}`, null, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("Workspace Details API Response:", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.workspace;
        toast.success("Workspace details loaded successfully!");
    } catch (error) {
        // console.log("Workspace API Error:", error);
        toast.error(error.response?.data?.message || "Failed to load workspace details");
    } finally {
        toast.dismiss(tokenId);
    }

    return result;
};
export const tokenStorage = async (token, workspaceId, access_token, refresh_token) => {
    try {
        const response = await axios.post(TOKEN_STORAGE_URL, {
            workspaceId,
            accessToken: access_token,
            refreshToken: refresh_token
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return true; 
    } catch (error) {
        // console.log("Token Storage API Error:", error);
        toast.error(error.response?.data?.message || "Failed to store tokens");
        return false;
    }
};

// Update a workspace
export const updateWorkspace = async (token, workspaceId, updateData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/workspaces/${workspaceId}`,
            updateData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Delete a workspace
export const deleteWorkspace = async (token, workspaceId, onSuccess) => {
    const toastId = toast.loading("Deleting workspace...");

    try {
        const response = await axios.delete(`${DELETE_WORKSPACE}/${workspaceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log("Delete Workspace API Response:", response);

        if (response.data.success) {
            toast.success("Workspace deleted successfully");
            if (onSuccess) onSuccess();
        } else {
            throw new Error("Failed to delete workspace");
        }
    } catch (error) {
        console.error("Delete Workspace API Error:", error);
        toast.error(error.response?.data?.message || "An error occurred");
    } finally {
        toast.dismiss(toastId);
    }
};

export const inviteEditor = async (token, workspaceId, email) => {
    try {
        const response = await axios.post(
            `${invite}${workspaceId}/invite`,
            { email },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        // console.log("Invitation response:", response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error adding editor:", error);
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};


// Confirm an invite
export const confirmInvite = async (token, inviteToken) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/confirm-invite?token=${inviteToken}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};


