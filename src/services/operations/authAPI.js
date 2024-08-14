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

            console.log("SEND OTP API RESPONSE >.........", response);
            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
             
        } catch (error) {
            console.log("Send otp api error", error);
            toast.error("Could not send otp")
            
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}



export function signUp(
    email, password, firstName, lastName, role, youtubeChannelId ,otp,navigate
){
    return async(dispatch)=>{
        const toastId= toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", SIGNUP_API,{
                email,
                password,
                firstName,
                lastName,
                role,
                youtubeChannelId,
                otp
            })
            console.log("SIGNUP API RESPONSE............", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("SIgnup  Successfully")
            navigate("/login")
        } catch (error) {
            console.log("signup api error ",error);
            toast.error("Signup failed")
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

            console.log("LOGIN API response ...........", response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successfull")
            dispatch(setToken(response.data.tokens))
            dispatch(setUser({...response.data.user}))
            localStorage.setItem("token",JSON.stringify(response.data.tokens))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/workspace/mp")
            
        } catch (error) {
            console.log("LOGIN API EORROR..........", error);
            toast.error("Login failed")   
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}