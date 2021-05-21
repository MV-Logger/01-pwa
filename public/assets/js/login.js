checkIndexAuth() // redirect if auth

document.addEventListener("DOMContentLoaded", init)

function init() {
    document.querySelector("form").addEventListener("submit", register)
}

function register(e) {
    e.preventDefault();
    const username = document.querySelector("#name").value
    const password = document.querySelector("#password").value
    loginUser(username, password)
        .catch(_ => {
            document.querySelector("#loginFailed").innerHTML = "Username or password doesn't match!"
        })
}

