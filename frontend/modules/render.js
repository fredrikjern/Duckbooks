import { landingMessage, loginMessage } from "./old/messages.js";
import { compareAuthor, compareRate, compareTitle } from "./compare.js";
import {  logout, userData } from "./auth.js";
import { login, register } from "./auth.js";
import { fadeInElement, fadeOutElement } from "./fadeinout.js";
import { timeout } from "./constant.js";
import { get, deleteToRead } from "./api.js";
import { renderMyProfile } from "./myProfile.js";

export function render(message, selector, timeout, listenerFunction) {
    let section = document.querySelector(`${selector}`);
  fadeOutElement(section); // Fade out the element
  setTimeout(function () {
    section.innerHTML = message;
    fadeInElement(section);
    if (listenerFunction) listenerFunction();
  }, timeout); //
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
