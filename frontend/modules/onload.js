import { render, landingListeners } from "./render.js";
import { landingMessage, loginMessage } from "./old/messages.js";
//import { login, register, renderloggedInPage } from "./auth.js";
import { getBooks } from "./api.js";

export async function onload() {
  let upperSection = document.querySelector(".upper-section");
  let lowerSection = document.querySelector(".lower-section");
  let timeout = 500;
  render(landingMessage, upperSection, timeout, landingListeners);
  render(await getBooks(), lowerSection, timeout);
  //   login();

  //loggedInPage()
}
