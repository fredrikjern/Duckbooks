import { landingMessage, loginMessage } from "./messages.js";
import { login, register } from "./auth.js";

export function render(message, section, timeout, loggedIn) {
  fadeOutElement(section); // Fade out the element
  setTimeout(function () {
    section.innerHTML = message;
    fadeInElement(section);
    if (message === landingMessage) landingListeners();
    if (message === loginMessage) loginListener();
    if (loggedIn) navbarListeners();
  }, timeout); //
}

async function renderMyProfile() {
    await get()
    
}

let navbarListeners = () => { 
let logoutButton = document.querySelector("#logout-button");
logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("logout");

});
    let myProfile = document.querySelector("#my-profile-button");
    myProfile.addEventListener('click', (event) => {

    event.preventDefault();
        renderMyProfile()
    });

}
let landingListeners = () => {
  let loginButton = document.getElementById("show-login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    let loginContainer = document.querySelector(".login-container");
    render(loginMessage, loginContainer);
  });
};
let loginListener = () => {
  let loginButton = document.querySelector("#login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });
};

// ! Styling

// Function to fade out the element
function fadeOutElement(element) {
  element.style.opacity = "0";
}
// Function to fade in the element
function fadeInElement(element) {
  element.style.opacity = "1";
}
