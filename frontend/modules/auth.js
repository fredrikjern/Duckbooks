import { API_BASE } from "./constant.js";
import { get } from "./api.js";
import { render } from "./render.js";
import { renderMyProfile } from "./myProfile.js";
import { onload } from "../main.js";
import { renderloggedInPage } from "./loggedIn.js";
export var userData = null;
export async function updateData() {
  userData = await get("/users/me?populate=deep,3");
  console.log("updated data");
}
let devmode = true;

export async function login() {
  try {
    let loginIdentifier;
    let loginPassword;
    if (devmode) {
      loginIdentifier = "Ernst";
      loginPassword = "Abcd1234";
    } else {
      loginIdentifier = document.querySelector("#identifier").value;
      loginPassword = document.querySelector("#password").value;
    }
    let response = await axios.post(`${API_BASE}/auth/local`, {
      identifier: loginIdentifier,
      password: loginPassword,
      //Add .value
    });
    sessionStorage.setItem("token", response.data.jwt);
    sessionStorage.setItem("loginId", response.data.user.id);
    if (sessionStorage.getItem("token")) renderloggedInPage();
    loginIdentifier = "";
    loginPassword = "";
  } catch (error) {
    console.log(error);
    console.log("error vid inlogg");
  }
}
export async function register() {
  let username = document.getElementById("register-username");
  let email = document.querySelector("#email");
  let registerPassword = document.querySelector("#register-password");
  await axios.post("http://localhost:1337/api/auth/local/register", {
    username: username.value,
    email: email.value,
    password: registerPassword.value,
  });
  alert("User has been created! Please login :) ");
}
export function logout() {
  sessionStorage.setItem("token", "");
  //let navbar = document.querySelector("#navbar");
  //navbar.innerHTML = "";
  onload();
}
