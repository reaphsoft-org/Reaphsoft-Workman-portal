export const logout = (user) => {
    user.logout();
    window.location.href = "/login/";
}

export function logOutAdmin(adminAuth) {
    adminAuth.logoutAdmin();
    window.location.href = "/admin/login/";
}