import { fadeInElement, fadeOutElement } from "./fadeinout.js";

export function render(message, selector, timeout, listenerFunction) {
    let section = document.querySelector(`${selector}`);
  fadeOutElement(section); // Fade out the element
  setTimeout(function () {
    section.innerHTML = message;
    fadeInElement(section);
    if (listenerFunction) listenerFunction();
  }, timeout); //
}


