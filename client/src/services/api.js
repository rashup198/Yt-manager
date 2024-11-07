export const endpoints = {
    SENDOTP_API:"http://localhost:5000/api/auth/send-otp",
    SIGNUP_API:"http://localhost:5000/api/auth/signup",
    LOGIN_API: "http://localhost:5000/api/auth/login",
    RESETPASSTOKEN_API: "http://localhost:5000/api/auth/resetPasswordToken",
    RESETPASSWORD_API:"http://localhost:5000/api/auth/resetPassword",
    // CHANGE_PASSWORD:"http://localhost:5000/api/auth/changePass"
  };


  export const workSpaceEndPoints= {
    CREATE_WORKSPACE:"http://localhost:5000/api/workspace/workspaces",
    GET_ALL_WORKSPACE:"http://localhost:5000/api/workspace/workspaces",
    GET_WORKSPACE_BY_ID:"http://localhost:5000/api/workspace/workspaces",
    UPDATE_WORKSPACE_DETAILS:"http://localhost:5000/api/workspace/workspaces",
    DELETE_WORKSPACE:"http://localhost:5000/api/workspace/workspaces", // delete request
    INVITE_EDITOR:"http://localhost:5000/api/workspace/workspaces/:id/invite",
    TOKEN_STORAGE_URL:"http://localhost:5000/api/workspace/storeYouTubeAccessToken",
    GET_ALL_WORKSPACE_FOR_EDITOR:"http://localhost:5000/api/workspace/getAllWorkspacesForEditor"
    
  };

  export const videoEndPoints={
    UPLOAD_VIDEO:"http://localhost:5000/api/videos/upload/:id/videos",
    APPROVE_VIDEO:"http://localhost:5000/api/videos/videos/:id/approve/:videoId",
    REJECT_VIDEO:"http://localhost:5000/api/videos/videos/:id/reject/:videoId",
    GET_VIDEO:"http://localhost:5000/api/videos/videos/:videoId",
    DELETE_VIDEO:"http://localhost:5000/api/videos/videos/:videoId", // delete request
    GET_ALL_THE_VIDEO_IN_WORKSPACE:"http://localhost:5000/api/videos/workspace/:id"
  }

  export const profileEndpoint={
    UPDATE_PROFILE_API:"http://localhost:5000/api/profile/updateProfile",
    DELETE_PROFILE_API:"http://localhost:5000/api/profile/deleteProfile",
    GET_WORKSPACE:"http://localhost:5000/api/profile/getworkspace",
    CHANGE_PASSWORD:"http://localhost:5000/api/profile/changePassword"
  }


// -------------------------------------------------------------------------------------------

// export const endpoints = {
//   SENDOTP_API: "https://yt-manager.onrender.com/api/auth/send-otp",
//   SIGNUP_API: "https://yt-manager.onrender.com/api/auth/signup",
//   LOGIN_API: "https://yt-manager.onrender.com/api/auth/login",
//   RESETPASSTOKEN_API: "https://yt-manager.onrender.com/api/auth/resetPasswordToken",
//   RESETPASSWORD_API: "https://yt-manager.onrender.com/api/auth/resetPassword",
//   // CHANGE_PASSWORD: "https://yt-manager.onrender.com/api/auth/changePass"
// };

// export const workSpaceEndPoints = {
//   CREATE_WORKSPACE: "https://yt-manager.onrender.com/api/workspace/workspaces",
//   GET_ALL_WORKSPACE: "https://yt-manager.onrender.com/api/workspace/workspaces",
//   GET_WORKSPACE_BY_ID: "https://yt-manager.onrender.com/api/workspace/workspaces",
//   UPDATE_WORKSPACE_DETAILS: "https://yt-manager.onrender.com/api/workspace/workspaces",
//   DELETE_WORKSPACE: "https://yt-manager.onrender.com/api/workspace/workspaces", // delete request
//   INVITE_EDITOR: "https://yt-manager.onrender.com/api/workspace/workspaces/:id/invite",
//   TOKEN_STORAGE_URL: "https://yt-manager.onrender.com/api/workspace/storeYouTubeAccessToken",
//   GET_ALL_WORKSPACE_FOR_EDITOR: "https://yt-manager.onrender.com/api/workspace/getAllWorkspacesForEditor"
// };

// export const videoEndPoints = {
//   UPLOAD_VIDEO: "https://yt-manager.onrender.com/api/videos/upload/:id/videos",
//   APPROVE_VIDEO: "https://yt-manager.onrender.com/api/videos/videos/:id/approve/:videoId",
//   REJECT_VIDEO: "https://yt-manager.onrender.com/api/videos/videos/:id/reject/:videoId",
//   GET_VIDEO: "https://yt-manager.onrender.com/api/videos/videos/:videoId",
//   DELETE_VIDEO: "https://yt-manager.onrender.com/api/videos/videos/:videoId", // delete request
//   GET_ALL_THE_VIDEO_IN_WORKSPACE: "https://yt-manager.onrender.com/api/videos/workspace/:id"
// };

// export const profileEndpoint = {
//   UPDATE_PROFILE_API: "https://yt-manager.onrender.com/api/profile/updateProfile",
//   DELETE_PROFILE_API: "https://yt-manager.onrender.com/api/profile/deleteProfile",
//   GET_WORKSPACE: "https://yt-manager.onrender.com/api/profile/getworkspace",
//   CHANGE_PASSWORD: "https://yt-manager.onrender.com/api/profile/changePassword"
// };
