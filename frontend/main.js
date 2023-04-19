import { render, landingListeners } from "./modules/render.js";
import { landingMessage, loginMessage } from "./modules/old/messages.js";
//import { login, register, renderloggedInPage } from "./auth.js";
import { getBooks } from "./modules/api.js";
import { timeout } from "./modules/constant.js";
import { renderNavbar } from "./modules/navbar.js";
import { updateCurrentPage, getCurrentPage } from "./modules/stateHandling.js";
export async function onload() {
  sessionStorage.setItem("token", "");
  updateCurrentPage("landing-page");
  render(landingMessage, ".upper-section", timeout, landingListeners);
  //render(await getBooks(), ".lower-section", timeout);
  renderNavbar();
  console.log(getCurrentPage());
}
onload();

// Access the current page state from any component
