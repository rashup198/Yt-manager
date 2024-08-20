import axios from 'axios';
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import {workSpaceEndPoints} from '../api'



// Base URL of your API
const API_BASE_URL = 'http://localhost:5000/api'; 

const {
    CREATE_WORKSPACE,
    GET_ALL_WORKSPACE,
    GET_WORKSPACE_BY_ID,
    UPDATE_WORKSPACE_DETAILS,
    DELETE_WORKSPACE, // delete request
    INVITE_EDITOR,
}= workSpaceEndPoints
// Create a workspace
export const createWorkspace = async (token, workspaceData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/workspace/workspaces`,
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
    const toastId = toast.loading("Loading..."); // Display a loading toast
    let result = [];
    
    try {
        const response = await apiConnector("GET", GET_ALL_WORKSPACE, null, {
            Authorization: `Bearer ${token}`, 
        });
        
        if (!response?.data?.success) {
            throw new Error("Could not fetch the workspaces");
        }
        
        result = response?.data?.workspaces; 
        console.log(result);
        
    } catch (error) {
        console.log("Get all workspaces API ERROR:", error);
        toast.error(error.message || "Failed to load workspaces"); 
    } finally {
        toast.dismiss(toastId); // Dismiss the loading toast
    }
    
    return result;
};


// Get workspace by ID
export const getWorkspaceById = async (token, workspaceId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workspaces/${workspaceId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
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
export const deleteWorkspace = async (token, workspaceId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/workspaces/${workspaceId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Invite an editor
export const inviteEditor = async (token, workspaceId, email) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/workspaces/${workspaceId}/invite`,
            { email },
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
