import { landingMessage, loginMessage } from "./old/messages.js";
import { compareAuthor,compareRate,compareTitle } from "./compare.js";
import { loginUsername, logout, userData } from "./auth.js";
import { login, register, generateLoggedInPage } from "./auth.js";
import { fadeInElement, fadeOutElement } from "./fadeinout.js";
import { timeout } from "./constant.js";
import { get, deleteToRead } from "./api.js";
import { renderMyProfile } from "./renderMyProfile.js";

export function render(message, section, timeout, listenerFunction) {
  if(section=="upper") section = document.querySelector(".upper-section")
  if(section=="lower") section = document.querySelector(".lower-section")
    fadeOutElement(section); // Fade out the element
  setTimeout(function () {
    section.innerHTML = message;
    fadeInElement(section);
    if (listenerFunction) listenerFunction();
  }, timeout); //
}
export async function renderNavbar() {
  let navbar = document.querySelector("nav");
  if (sessionStorage.getItem("token").length > 20) {
    console.log("if token");
    console.log(sessionStorage.getItem("token").length);
    let navbarUl = `
            <ul>
                <li>
                    <button id="home-button">Home</button>
                </li>
                <li>
                    <button id="my-profile-button">My Profile</button>
                </li>
                <li>
                    <button id="logout-button">Log out</button> <span class="display-username"> ${loginUsername} </span>
                </li>
            </ul>
                `;
    render(navbarUl, navbar, timeout, navbarListeners);
  } else {
    navbar.innerHTML = "";
  }
}
function navbarListeners() {
  let homeButton = document.getElementById("home-button");
  homeButton.addEventListener("click", (event) => {
    event.preventDefault();
    render(generateLoggedInPage(), "upper", 500);
    //renderLoggedInBookList();
  });
  let logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("logout");
    logout();
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
