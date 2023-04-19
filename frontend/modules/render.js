
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


