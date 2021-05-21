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
        if (!resp.ok) return Promise.reject(); // ternary operator doesnt wanna work for some reason
        return resp;
    })
}

function registerUser(username, passwd) {
    return call("/auth/register", "POST", {username: username, password: passwd});
}

function loginUser(username, passwd) {
    return call("/auth/login", "POST", {username: username, password: passwd})
        .then(resp => resp.json())
        .then(resp => store.setItem("token", resp.access_token))
        .then(_ => {
            window.location.href = "home.html"
        })
}

function checkIndexAuth() {
    callAuth("/auth/authenticated")
        .then(_ => window.location.href = "home.html")
        .catch(_ => void _) // ignore
}

function checkHomeAuth() {
    callAuth("/auth/authenticated")
        .catch(_ => window.location.href = "index.html")
}

function getBooks() {
    return callAuth("/books").then(res => res.json())
}

function addBooks(name) {
    return callAuth("/books", "POST", {name: name})
}

function getEntries(bookId) {
    return callAuth(`/books/${bookId}/entries`)
        .then(res => res.json())
}

function addEntry(bookId, text, when, where) {
    return callAuth(`/books/${bookId}/entries`, "POST", {when: when, where: where, text: text})
}