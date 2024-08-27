import axios from 'axios';
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import {videoEndPoints} from "../api"
import { useNavigate } from 'react-router-dom';
import { setLoading, setToken } from "../../slices/authSlice"


const API_BASE_URL ='http://localhost:5000/api';

const{
    UPLOAD_VIDEO,
    APPROVE_VIDEO,
    REJECT_VIDEO,
    GET_VIDEO,
    DELETE_VIDEO,
    GET_ALL_THE_VIDEO_IN_WORKSPACE,
} = videoEndPoints

export function uploadVideo(token, workspaceId, file, title, description) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading video...");
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('video', file);

            const response = await apiConnector(
                "POST",
                `${UPLOAD_VIDEO.replace(':id', workspaceId)}`,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            );

            toast.success("Video uploaded successfully", { id: toastId });
            dispatch(setLoading(false));
            return response.data;
        } catch (error) {
            console.error('Error uploading video:', error);
            toast.error("Failed to upload video", { id: toastId });
            dispatch(setLoading(false));
            throw error;
        }
    };
}


export function approveVideo(token, workspaceId, videoId) {
    return async (dispatch) => {
        const toastId = toast.loading("Approving video...");

        try {
            const response = await apiConnector(
                "PUT", // Updated to PUT
                `${APPROVE_VIDEO.replace(':id', workspaceId).replace(':videoId', videoId)}`,
                {},
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            toast.success("Video approved successfully", { id: toastId });
            dispatch(setLoading(false));
            return response.data;
        } catch (error) {
            console.error('Error approving video:', error);
            toast.error("Failed to approve video", { id: toastId });
            dispatch(setLoading(false));
            throw error;
        }
    };
}

export function rejectVideo(token, workspaceId, videoId) {
    return async (dispatch) => {
        const toastId = toast.loading("Rejecting video...");
        try {
            const response = await apiConnector(
                "PUT", // Updated to PUT
                `${REJECT_VIDEO.replace(':id', workspaceId).replace(':videoId', videoId)}`,
                {},
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            toast.success("Video rejected successfully", { id: toastId });
            dispatch(setLoading(false));
            return response.data;
        } catch (error) {
            console.error('Error rejecting video:', error);
            toast.error("Failed to reject video", { id: toastId });
            dispatch(setLoading(false));
            throw error;
        }
    };
}



export function getVideo(token, videoId) {
    return async (dispatch) => {
        try {
            const response = await apiConnector(
                "GET",
                `${GET_VIDEO.replace(':id', videoId)}`,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            dispatch(setLoading(false));
            return response.data.video;
        } catch (error) {
            console.error('Error fetching video details:', error);
            toast.error("Failed to fetch video details");
            dispatch(setLoading(false));
            throw error;
        }
    };
}


export function deleteVideo(token, videoId) {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting video...");
        try {
            const response = await apiConnector(
                "DELETE",
                `${DELETE_VIDEO.replace(':videoId', videoId)}`,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            toast.success("Video deleted successfully", { id: toastId });
            dispatch(setLoading(false));
            return response.data;
        } catch (error) {
            console.error('Error deleting video:', error);
            toast.error("Failed to delete video", { id: toastId });
            dispatch(setLoading(false));
            throw error;
        }
    };
}


export function getAllVideosInWorkspace(token, workspaceId) {
    return async (dispatch) => {
        try {
            const response = await apiConnector(
                "GET",
                `${GET_ALL_THE_VIDEO_IN_WORKSPACE.replace(':id', workspaceId)}`,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            dispatch(setLoading(false));
            return response.data.videos;
        } catch (error) {
            console.error('Error fetching videos in workspace:', error);
            toast.error("Failed to fetch videos");
            dispatch(setLoading(false));
            throw error;
        }
    };
}
export const uploadVideoToYouTube = (token, workspaceId, videoId) => async (dispatch) => {
    const toastId = toast.loading("Uploading video...");
    try {
        const response = await axios.post(
            `http://localhost:5000/api/videos/${workspaceId}/videos/${videoId}/upload-to-youtube`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        toast.success("Video uploaded successfully", { id: toastId });
        dispatch({ type: 'UPLOAD_VIDEO_TO_YOUTUBE_SUCCESS', payload: response.data });
    } catch (error) {
        toast.error("Failed to upload video", { id: toastId });
        console.error('Error uploading video to YouTube:', error);
        dispatch({ type: 'UPLOAD_VIDEO_TO_YOUTUBE_FAILURE', error }); // Optionally dispatch an error action
        throw error;
    }
};
