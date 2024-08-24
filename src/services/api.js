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
    APPROVE_VIDEO:"http://localhost:5000/api/videos/videos/:id/approve/:vID",
    REJECT_VIDEO:"http://localhost:5000/api/videos/videos/:id/reject/:vId",
    GET_VIDEO:"http://localhost:5000/api/videos/videos/:id",
    DELETE_VIDEO:"http://localhost:5000/api/videos/videos/:id", // delete request
    GET_ALL_THE_VIDEO_IN_WORKSPACE:"http://localhost:5000/api/videos/workspace/:id"
  }

  export const profileEndpoint={
    UPDATE_PROFILE_API:"http://localhost:5000/api/profile/updateProfile",
    DELETE_PROFILE_API:"http://localhost:5000/api/profile/deleteProfile",
    GET_WORKSPACE:"http://localhost:5000/api/profile/getworkspace",
    CHANGE_PASSWORD:"http://localhost:5000/api/profile/changePassword"
  }