import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    },
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            console.log("state in slice", state.userInfo);
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },

        update: (state, action) => {
            state.userInfo = action.payload;
            localStorage.removeItem('userInfo');
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const { login, update, logout } = userSlice.actions; //we can use it in login page
export default userSlice.reducer;