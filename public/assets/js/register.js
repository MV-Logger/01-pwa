document.addEventListener("DOMContentLoaded", init)

function init() {
    document.querySelector("form").addEventListener("submit", register)
}

function register(e) {
    e.preventDefault();
    const username = document.querySelector("#name").value
    const password = document.querySelector("#password").value
    registerUser(username, password)
        .then(_ => loginUser(username, password))
        .catch(_ => {
            document.querySelector("#usernameError").innerHTML = "Username exists already!"
        })
}

