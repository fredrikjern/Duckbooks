import { render } from "./modules/render.js";
import { login, register } from "./modules/auth.js";
import { timeout } from "./modules/constant.js";
import { renderNavbar } from "./modules/navbar.js";
import { updateCurrentPage } from "./modules/stateHandling.js";
import { setColorTheme } from "./modules/api.js";

export async function onload() {
  sessionStorage.setItem("token", "");
  updateCurrentPage("landing-page");

  let message = `
        <div class="content-container">
           <h2> Välkommen til Ankademiebokhandeln </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt facere possimus! Iusto ab cupiditate adipisci eveniet nesciunt non, impedit illum eius consequatur labore quibusdam inventore soluta architecto dicta?</p>
            <div class="login-container">
                <div><button id="show-login-button">Logga in</button></div>
                <div> <p>Or</p></div>
                <div><button id="show-register-button">Registrera dig</button></div>
            </div>
          </div>
`;

  render(message, ".upper-section", timeout, landingListeners);
  renderNavbar();
}
function landingListeners() {
  let loginButton = document.getElementById("show-login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    updateCurrentPage("login-form");
    renderNavbar();
    let loginMessage = `
    <h2>Login</h2>
    <div class="login">
    <label for="identifier">Användarnamn
    <input type="text" id="identifier" />
    </label>
    <label for="password"> Lösenord
    <input type="password" id="password" />
    </label>
    <button id="login-button">Login</button>
    </div>
    `;
    render(loginMessage, ".login-container", timeout, loginListener);
  });

  let registerButton = document.getElementById("show-register-button");
  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    let registerMessage = `
      <h2>Login</h2>
    <div class="login">
          <label for="register-username">Användarnamn
          <input type="text" id="register-username">
          </label>
        <label for="email">Email-adress
        <input type="email" id="email">
        </label>
        <label for="register-password">Lösenord
        <input type="password" id="register-password">
        </label>
    <button id="register-button">Registrera dig!</button>
    </div>
    `;
    render(registerMessage, ".login-container", timeout, registerListener);
  });
}

let loginListener = () => {
  let loginContainer = document.querySelector(".login-container");
  loginContainer.classList.add("llogin");
  let loginButton = document.querySelector("#login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });
};

let registerListener = () => {
  let loginContainer = document.querySelector(".login-container");
  loginContainer.classList.add("llogin");
  let registerButton = document.querySelector("#register-button");
  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    register();
  });
};
async function initial() {
  await setColorTheme();
  onload();
}
initial();
