export const logout = (user) => {
    user.logout();
    window.location.href = "/login/";
}

