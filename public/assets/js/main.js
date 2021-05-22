document.addEventListener("DOMContentLoaded", init)

function init() {
    registerSW();
}

function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(_ => console.log("registered sw"))
            .catch(e => console.log("failed to register sw", e));
    }
}
