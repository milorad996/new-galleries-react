export function selectActiveUser(state) {
    return state.auth.user;
}
export function selectIsAuthenticated(state) {
    return !!state.auth.token;
}
export function selectRegisterErrors(state) {
    return state.auth.registerErrors;
}
export function selectLoginErrors(state) {
    return state.auth.loginErrors;
}
export function selectSuccessfullyLogged(state) {
    return state.auth.loggedSuccessfully;
}
export function selectSuccessfullyCreatedUser(state) {
    return state.auth.successfullyCreatedUser;
}
