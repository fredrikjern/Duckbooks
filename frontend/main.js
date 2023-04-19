import { render } from "./modules/render.js";
import { login, register } from "./modules/auth.js";
import { timeout } from "./modules/constant.js";
import { renderNavbar } from "./modules/navbar.js";
import { updateCurrentPage, getCurrentPage } from "./modules/stateHandling.js";
export async function onload() {
  sessionStorage.setItem("token", "");
  updateCurrentPage("landing-page");

  let message = `
        <div class="content-container">
           <h2> Welcome to Duckbooks </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt facere possimus! Iusto ab cupiditate adipisci eveniet nesciunt non, impedit illum eius consequatur labore quibusdam inventore soluta architecto dicta?</p>
            <div class="login-container">
                <div><button id="show-login-button">Login</button></div>
                <div> <p>Or</p></div>
                <div><button id="show-register-button">Register</button></div>
            </div>
          </div>
`;
  
  render(message, ".upper-section", timeout, landingListeners);
  renderNavbar();
  console.log(getCurrentPage());
}
function landingListeners() {
  let loginButton = document.getElementById("show-login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    let loginMessage = `
    <h2>Login</h2>
    <label for="identifier">Username
    <input type="text" id="identifier" />
    </label>
    <label for="password"> Password
    <input type="password" id="password" />
    </label>
    <button id="login-button">Login</button>
    `;
    render(loginMessage, ".login-container", timeout, loginListener);
  });

  let registerButton = document.getElementById("show-register-button");
  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    let registerMessage = `
          <label for="register-username">Användarnamn</label>
        <input type="text" id="register-username">
        <label for="email">Email-adress</label>
        <input type="email" id="email">
        <label for="register-password">Lösenord</label>
        <input type="password" id="register-password">
    <button id="register-button">Registrera dig!</button>
    `;
    render(registerMessage, ".login-container", timeout, registerListener);
  });
  
}

let loginListener = () => {
    let loginContainer = document.querySelector(".login-container");
    loginContainer.classList.add("login")
  let loginButton = document.querySelector("#login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });
};

let registerListener = () => {
    let loginContainer = document.querySelector(".login-container");
    loginContainer.classList.add("login")
  let registerButton = document.querySelector("#register-button");
  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    register();
  });
};

onload();