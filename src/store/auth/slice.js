import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    register() { },
    getActiveUser() { },
    login() { },
    logout() { },


};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token"),
        user: [],
        loginErrors: null,
        registerErrors: null,
        loggedSuccessfully: "",
        successfullyCreatedUser: "",

    },
    reducers: {
        setActiveUser(state, { payload }) {
            state.user = payload;
        },
        setToken(state, { payload }) {

            state.token = payload;
        },
        setRegisterErrors: (state, { payload }) => {
            state.registerErrors = payload;
        },
        setLoginErrors: (state, { payload }) => {
            state.loginErrors = payload;
        },
        successfulLogin: (state, { payload }) => {
            state.loggedSuccessfully = payload;
        },
        setSuccessfullyCreatedUser: (state, { payload }) => {
            state.successfullyCreatedUser = payload;
        },

        ...middlewareActions,
    },
});


export default authSlice.reducer;

export const {
    setActiveUser,
    setToken,
    register,
    setRegisterErrors,
    getActiveUser,
    login,
    setLoginErrors,
    logout,
    successfulLogin,
    setSuccessfullyCreatedUser

} = authSlice.actions;