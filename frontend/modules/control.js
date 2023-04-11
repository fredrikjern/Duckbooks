import { render } from "./render.js";
import { landingMessage, loginMessage } from "./messages.js";
import { login, register } from "./auth.js";
import { getBooks } from "./api.js";

export async function onload() {
  let upperSection = document.querySelector(".upper-section");
  let lowerSection = document.querySelector(".lower-section");
  let timeout = 500;
  render(landingMessage, upperSection, timeout);
    render(await getBooks(), lowerSection, timeout);
    login()
}
