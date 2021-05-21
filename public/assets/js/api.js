const nodeServer = "http://localhost:5000/api"
const laravelServer = "http://homestead.test/api"
const server = nodeServer

const store = localforage.createInstance({name: "logs"});

function callAuth(uri, method, body) {
    return store.getItem("token")
        .then(v => call(uri, method, body, v))
}

function call(uri, method = "GET", body, token) {

    return fetch(server + uri, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined
        },
        body: JSON.stringify(body)
    }).then(resp => {
        if (resp.ok) return Promise.reject(); // ternary operator doesnt wanna work for some reason
        return resp;
    })
}

function registerUser(username, passwd) {
    return call("/auth/register", "POST", {username: username, password: passwd});
}

function loginUser(username, passwd) {
    return call("/auth/login", "POST", {username: username, password: passwd})
        .then(resp => resp.json())
        .then(async resp => {
            console.log(resp)
            await store.setItem("token", resp.access_token)
        })
        .then(_ => {
            window.location.href = "home.html"
        })
}

function checkIndexAuth() {
    callAuth("/auth/login")
        .then(_ => window.location.href = "home.html")
}

function checkHomeAuth() {
    callAuth("/auth/login")
        .catch(_ => window.location.href = "index.html")
}