import {toast} from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../api"


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints

export function sendOTP(email, navigate){
    return async (dispatch)=>{
        const toastId= toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPrensent:true,
            })

            // console.log("SEND OTP API RESPONSE >.........", response);
            // console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
             
        } catch (error) {
            // console.log("Send otp api error", error);
            toast.error(error.message)
            
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}



export function signUp(email, password, firstName, lastName, role, otp, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                email,
                password,
                firstName,
                lastName,
                role,
                otp,
            });
            // console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
              }
              toast.success("Signup Successful")
              navigate("/login")
            } catch (error) {
            //   console.log("SIGNUP API ERROR............", error)
              toast.error("Signup Failed")
              navigate("/signup")
            }
            dispatch(setLoading(false))
            toast.dismiss(toastId)
          }
        }

export function login(email,password,navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading.....")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", LOGIN_API,{
                email, password
            })  

            // console.log("LOGIN API response ...........", response);
            
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successfull")
            console.log("Apka sawagat hai...!");
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/workspace/mp")
            
        } catch (error) {
            // console.log("LOGIN API EORROR..........", error);
            toast.error("Login failed")   
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      console.log("Fir mulakat hogi..!");
      
      toast.success("Logged Out")

      navigate("/")
    }
  }

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));

        try {
            const response=  await apiConnector("POST", RESETPASSTOKEN_API,{
                email,
            })
            // console.log("Reset password token response ........", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent")
            setEmailSent(true)
            
        } catch (error) {
            // console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(password,confirmPassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API,{
                password,
                confirmPassword,
                token
            })
            // console.log("RESET password resposen ........", response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password has been reset successfully")
            
        } catch (error) {
            // console.log("Reset password token error", error);
            toast.error("Unable to reset the password")
        }
        dispatch(setLoading(false));
    }
}