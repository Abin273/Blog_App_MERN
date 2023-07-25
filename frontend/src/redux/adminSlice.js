import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name:"admin",
    initialState:{
        adminInfo: localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null
    },
    reducers:{
        login:(state,action)=>{
            state.adminInfo = action.payload;
            console.log("admin slice state",action.payload);
            localStorage.setItem("adminInfo",JSON.stringify(action.payload))
        },

        update:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.removeItem("adminInfo");
            localStorage.setItem("adminInfo",JSON.stringify(action.payload))
        },

        logout:(state)=>{
            state.adminInfo = null;
            localStorage.removeItem("adminInfo");
        }
    }
})

export const { login ,update , logout} = adminSlice.actions;
export default adminSlice.reducer;