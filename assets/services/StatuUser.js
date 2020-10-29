

const token = window.localStorage.getItem("authToken")

function StatuRole(role) {
    if ( JSON.stringify(role) != JSON.stringify(["ROLE_ADMIN", "ROLE_USER"]))
    {
        return false
    }else {
        return true
    }
}

export default {
    StatuRole
}