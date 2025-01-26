import { createSlice } from "@reduxjs/toolkit";

const userInfoLocalStorageKey = "userInfo";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: localStorage.getItem(userInfoLocalStorageKey)
            ? JSON.parse(localStorage.getItem(userInfoLocalStorageKey))
            : null,
    },
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem(
                userInfoLocalStorageKey,
                JSON.stringify(action.payload)
            );
        },

        update: (state, action) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
            localStorage.setItem(
                userInfoLocalStorageKey,
                JSON.stringify({
                    ...JSON.parse(
                        localStorage.getItem(userInfoLocalStorageKey)
                    ),
                    ...action.payload,
                })
            );
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem(userInfoLocalStorageKey);
        },
    },
});

export const { login, update, logout } = userSlice.actions; //we can use it in login page
export default userSlice.reducer;
