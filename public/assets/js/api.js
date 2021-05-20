const nodeServer = "http://localhost:5000/api"
const laravelServer = "http://homestead.test/api"

const server = nodeServer

function call(uri, method = "GET", body, auth = false,) {
    return fetch(server + uri, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            //Authorization: auth ? `Bearer ${"todo"}` : undefined
        },
        body: JSON.stringify(body)
    }).then(resp => {
        if (resp.status !== 200 && resp.status !== 201) {
            return Promise.reject()
        }
        return resp
    })
}

function registerUser(username, passwd) {
    return call("/auth/register", "POST", {username: username, password: passwd});
}

function loginUser(username, passwd) {
    return call("/auth/login", "POST", {username: username, password: passwd})
        .then(resp => resp.json())
        .then( async resp => {
            console.log(resp)
            await localforage.setItem("token", resp.access_token)
        })
        .then(_ => {
            window.location.href = "home.html"
        })
}