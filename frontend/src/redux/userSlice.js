import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:"user",
    initialState: {
        id:null,
        userName:"",
        email:"",
        isBlocked:false
    },
    reducers:{
        login:(state,action)=>{
            state.id=action.payload.id
            state.userName = action.payload.userName
            state.email = action.payload.email
            state.isBlocked = action.payload.isBlocked
        },

        update:(state,action)=>{
            state.user = action.payload.user
        },

        logout:(state)=>{
            state = null
        }
    }
})

export const {login, update, logout}= userSlice.actions; //we can use it in login page
export default userSlice.reducer;