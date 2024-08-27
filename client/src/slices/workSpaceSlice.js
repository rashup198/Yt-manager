import { createSlice } from "@reduxjs/toolkit";

const intialState={
    step :1,
    workspace :null,
    editWorkSpace:false,
}

const workspaceSlice = createSlice({
    name : "workspace",
    intialState,
    reducers:{
        setStep: (state, action) => {
            state.step = action.payload
        },
        setWorkspace:(state, action)=> {
            state.workspace = action.payload
        },
        setEditWorkspace:(state,action)=>{
            state.editWorkSpace =action.payload
        },
        resetWorkspace:(state,action)=>{
            state.step =1
            state.workspace=null
            state.editWorkSpace=false
        },
        setVideo:(state, action)=>{
            state.step = action.payload
        },
        
    }
})


export const {
    setStep,
    setWorkspace,
    setEditWorkspace,
    resetWorkspace
} = workspaceSlice.actions

export default workspaceSlice.reducer