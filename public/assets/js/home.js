checkHomeAuth() // redirect if auth

document.addEventListener("DOMContentLoaded", init)
const addBookBtn = `<button data-bs-toggle="modal" data-bs-target="#addBook">+</button>`;
let bookIdSelected
let myModal

function init() {
    loadBooks();
    document.querySelector("#addEntry").addEventListener("submit", clickEntry)
    document.querySelector("#addBook").addEventListener("submit", clickBook)
    myModal = new bootstrap.Modal(document.getElementById('addBook'))
}

function loadBooks() {
    const nav = document.querySelector("nav")
    nav.innerHTML = "";

    getBooks()
        .then(books => {
            books.forEach(book => {
                nav.innerHTML += `<div data-id="${book.id}">${book.name}</div>`
            })
            nav.innerHTML += addBookBtn
            nav.addEventListener("click", navbarClicked)
        })
}

function navbarClicked(e) {
    const chat = document.querySelector("#addEntry")
    if (e.target.tagName === "DIV" && !e.target.classList.contains("active")) {
        e.currentTarget.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
        e.target.classList.add("active")
        loadEntries(e.target.dataset.id)
            .then(_ => chat.classList.remove("d-none"))
    } else if (e.target.tagName === "DIV") {
        e.target.classList.remove("active")
        const section = document.querySelector("main section");
        section.innerHTML = ""
        chat.classList.add("d-none")
    }
}

function loadEntries(id) {
    bookIdSelected = id
    const section = document.querySelector("main section");
    section.innerHTML = ""
    return getEntries(id).then(entries => {
        entries.forEach(entry => {
            section.innerHTML += `<article>${entry.text}</article>`
        });
        scrollToLastEntry();
    })
}

function scrollToLastEntry() {
    document.querySelectorAll("section article:last-child").forEach(el => el.scrollIntoView({behavior: "smooth"}))
}

function clickEntry(e) {
    e.preventDefault();
    const txt = document.querySelector("#addEntry textarea")
    const section = document.querySelector("main section");

    addEntry(bookIdSelected, txt.value, " s", " s")
        .then(_ => {
            section.innerHTML += `<article>${txt.value}</article>`
            txt.value = ""
            scrollToLastEntry()
        })
}

function clickBook(e) {
    e.preventDefault();
    const name = document.querySelector("#addBook #name")

    addBook(name.value).then(_ => {
        myModal.hide()
        loadBooks();
    })
    name.value = ""
}