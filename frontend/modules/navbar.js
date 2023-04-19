import { userData, logout } from "./auth.js";
import { render } from "./render.js";
import { renderMyProfile } from "./myProfile.js";
import { renderLoggedInBookList, renderloggedInPage } from "./loggedIn.js";
import { renderAllBooks } from "./allBooks.js";
import { onload } from "../main.js";
import { updateCurrentPage, getCurrentPage } from "./stateHandling.js";

export async function renderNavbar() {
  if (sessionStorage.getItem("token").length > 20) {
    let navbarUl = `
            <ul>
                <li>
                    <button id="home-button">Home</button>
                </li>
                <li>
                    <button id="all-books-button">Alla böcker</button>
                </li>
                <li>
                    <button id="my-profile-button">${userData.username} Profile</button>
                </li>
                <li>
                    <button id="logout-button">Log out</button>
                </li>
            </ul>
                `;
    render(navbarUl, "nav", 0, navbarListeners);
  } else {
    let navbar = `
            <ul>
                <li>
                    <button id="logged-out-home-button">Hem</button>
                </li>
                <li>
                    <button id="all-books-button">Alla böcker</button>
                </li>
            </ul>
                `;
    render(navbar, "nav", 0, loggedOutListeners);
  }
}

function loggedOutListeners() {
  if (getCurrentPage() !== "all-books") {
    let allBooksButton = document.getElementById("all-books-button");
    allBooksButton.addEventListener("click", (event) => {
      event.preventDefault();
      renderAllBooks();
    });
  } else if (getCurrentPage() !== "landing-page") {
    let homeButton = document.getElementById("logged-out-home-button");
    homeButton.addEventListener("click", (event) => {
      event.preventDefault();
      onload();
    });
  } 
}
function navbarListeners() {
  if (getCurrentPage() !== "logged-in-all-books") {
    let allBooksButton = document.getElementById("all-books-button");
    allBooksButton.addEventListener("click", (event) => {
      event.preventDefault();
        renderLoggedInBookList();
        renderNavbar()
    });
  }
  if (getCurrentPage() !== "logged-in-home") {
    let homeButton = document.getElementById("home-button");
    homeButton.addEventListener("click", (event) => {
      event.preventDefault();
       renderloggedInPage()
    });
  }
  if (getCurrentPage() !== "my-profile") {
    let myProfile = document.querySelector("#my-profile-button");
    myProfile.addEventListener("click", (event) => {
      event.preventDefault();
        renderMyProfile();
        renderNavbar()
    });
  } else {
    console.log("nada");
  }

  let logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      updateCurrentPage('logout')
    logout();
  });
}
