import { render, landingListeners, renderNavbar } from "./render.js";
import { landingMessage, loginMessage } from "./old/messages.js";
//import { login, register, renderloggedInPage } from "./auth.js";
import { getBooks } from "./api.js";
import { timeout } from "./constant.js";
export async function onload() {
  sessionStorage.setItem("token", ""); 
  let upperSection = document.querySelector(".upper-section");
  let lowerSection = document.querySelector(".lower-section");
  render(landingMessage, upperSection, timeout, landingListeners);
  render(await getBooks(), lowerSection, timeout);
  renderNavbar();
}
