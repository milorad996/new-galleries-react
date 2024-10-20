import { takeLatest, call, put } from "redux-saga/effects";
import authService from "../../services/AuthService";
import {
    setActiveUser,
    setToken,
    register,
    getActiveUser,
    setRegisterErrors,
    login,
    setLoginErrors,
    logout,
    successfulLogin,
    setSuccessfullyCreatedUser,



} from "./slice";



function* handleRegister({ payload }) {

    try {
        const data = yield call(authService.register, payload);

        yield put(setActiveUser(data.user));
        yield put(setSuccessfullyCreatedUser(data.message));
    } catch (e) {
        if (e.response?.status === 422) {
            yield put(setRegisterErrors(e.response.data.errors));
        } else {
            alert("Registration failed");
        }
    }
}

function* handleGetActiveUser() {
    try {
        const activeUser = yield call(authService.getMyProfile);
        yield put(setActiveUser({ ...activeUser }));
    } catch (error) {
        console.log(error);
    }
}
function* handleLogin({ payload }) {
    try {
        const data = yield call(authService.login, payload);

        localStorage.setItem("token", data.authorization.token);
        yield put(setActiveUser(data.user));
        yield put(successfulLogin(data.message));
        yield put(setToken(data.authorization.token));
    } catch (e) {
        if (e.response?.status === 401) {
            yield put(setLoginErrors(e.response?.data));
        } else if (e.response.status === 422) {
            yield put(setLoginErrors(e.response?.data));
        }
        else {
            alert("Invalid credentials");
        }
    }
}
function* handleLogout({ payload }) {
    try {
        yield call(authService.logout);
        localStorage.removeItem("token");
        if (typeof payload.meta?.onSuccessLogout === "function") {
            yield call(payload.meta.onSuccessLogout);
        }
        yield put(setToken(null));
        yield put(setActiveUser(null));
    } catch (error) {
        console.log(error);
    }
}








export function* watchRegister() {
    yield takeLatest(register.type, handleRegister);
}
export function* watchGetActiveUser() {
    yield takeLatest(getActiveUser.type, handleGetActiveUser);
}
export function* watchLogin() {
    yield takeLatest(login.type, handleLogin);
}
export function* watchLogout() {
    yield takeLatest(logout.type, handleLogout);
}
