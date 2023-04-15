import { landingMessage, loginMessage } from "./old/messages.js";
import { loginUsername, userData } from "./auth.js";
import { login, register } from "./auth.js";
import { fadeInElement, fadeOutElement } from "./fadeinout.js";
import { timeout } from "./constant.js";
import { get, deleteToRead } from "./api.js";

export function render(message, section, timeout, listenerFunction) {
  fadeOutElement(section); // Fade out the element
  setTimeout(function () {
    section.innerHTML = message;
    fadeInElement(section);
    if (listenerFunction) listenerFunction();
  }, timeout); //
}
export async function renderNavbar() {
  if (loginUsername !== null) {
    let navbar = document.querySelector("nav");
    let navbarUl = `
            <ul>
                <li>
                    <button id="my-profile-button">My Profile</button>
                </li>
                <li>
                    <button id="logout-button">Log out</button> <span class="display-username"> ${loginUsername} </span>
                </li>
            </ul>
                `;
    render(navbarUl, navbar, timeout, navbarListeners);
    if (loginUsername === null) console.log("lika med null");
  }
}
export async function renderMyProfile() {
  console.log(userData.to_reads, "to-reads");
  let html = `
  <div>
  <h2>${loginUsername}'s Profile  </h2>
  </div>
  <div>
    <h3>To read list</h3>
    <ul id="to-read-list-list"> </ul> 
  </div>
  <div>
    <h3>${loginUsername} have rated these books</h3>
    <ul id="rated-list></ul>
  </div>
  `;
  let upperSection = document.querySelector(".upper-section");
  render(html, upperSection, timeout, appendReadList);
}
function appendReadList() {
  let toReadList = document.getElementById("to-read-list-list");
  userData.to_reads.forEach((book) => {
    let li = document.createElement("li");
    let div = document.createElement("div");
    div.innerHTML = `
      Title: ${book.book.Title}
        `;
    let buttonDiv = document.createElement("div");
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    buttonDiv.append(removeButton);
    li.append(div, buttonDiv);
    toReadList.append(li);
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      let endpoint = `/to-reads/${book.id}`;
      deleteToRead(endpoint);
      removeButton.parentNode.parentNode.remove();
    });
    //eventlistener
  });
}
function navbarListeners() {
  let logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("logout");
  });
  let myProfile = document.querySelector("#my-profile-button");
  myProfile.addEventListener("click", (event) => {
    event.preventDefault();
    renderMyProfile();
  });
}

export function landingListeners() {
  let loginButton = document.getElementById("show-login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    let loginContainer = document.querySelector(".login-container");
    //render(loginMessage, loginContainer);
    login();
  });
}
let loginListener = () => {
  let loginButton = document.querySelector("#login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });
};
