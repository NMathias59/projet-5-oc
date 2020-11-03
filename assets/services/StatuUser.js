const token = window.localStorage.getItem("authToken")

function StatuRole(role) {
    return role.includes("ROLE_ADMIN")
}

export default {
    StatuRole
}