import { userData } from "./auth.js";
import { render } from "./render.js";
import { timeout } from "./constant.js";
import { renderMyProfile } from "./myProfile.js";
import { generateLoggedInPage } from "./loggedIn.js";
import { renderLoggedInBookList } from "./loggedIn.js";
export async function renderNavbar() {
  if (sessionStorage.getItem("token").length > 20) {
    let navbarUl = `
            <ul>
                <li>
                    <button id="home-button">Home</button>
                </li>
                <li>
                    <button id="my-profile-button">${userData.username} Profile</button>
                </li>
                <li>
                    <button id="logout-button">Log out</button>
                </li>
            </ul>
                `;
    render(navbarUl, "nav", timeout, navbarListeners);
  } else {
    document.querySelector("nav").innerHTML = "";
  }
}
function navbarListeners() {
  let homeButton = document.getElementById("home-button");
  homeButton.addEventListener("click", (event) => {
    event.preventDefault();
    render(generateLoggedInPage(), ".upper-section", 500);
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
    renderLoggedInBookList();
  });
}
