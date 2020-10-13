import Axios from "axios";
import jwtDecode from "jwt-decode";


function logout() {
    window.localStorage.removeItem("authToken");
    delete Axios.defaults.headers["Authorization"]
}


function authenticate(credentials) {
    return Axios.post("http://127.0.0.1:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token)
            setAxiosToken(token)
        })
}

function setAxiosToken(token) {
    Axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken")

    if (token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
        }
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken")

    if (token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            return true
        }
        return false
    }
    return false
}


export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}