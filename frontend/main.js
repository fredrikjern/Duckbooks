import { createElement,checkLoginStatus } from "./modules/helpers.js";
import { logout } from "./modules/logout.js";
import { renderNavbar } from "./modules/navbar.js";
import { renderBooks,renderGrade,renderLandinpage,renderLogin,renderPostLogin,renderRegister } from "./modules/render.js";
const API_BASE = "http://localhost:1337/api";
// Async  APIfunctions
let getBooks = async () => {
  try {
    let response = await axios.get(
      "http://localhost:1337/api/books?populate=*"
    );
    renderBooks(await response.data.data);
  } catch (error) {
    console.log(error);
  }
};
let setColorTheme = async () => {
  try {
    let response = await axios.get("http://localhost:1337/api/theme");
    if (!response.data.data.attributes.Lightmode) {
      document.querySelector("header").style.background = "green";
    }
  } catch (error) {
    console.log(error);
  }
};
//* Authentication functions
let register = async () => {
  let username = document.getElementById("register-username");
  console.log(username);
  let email = document.querySelector("#email");
  let registerPassword = document.querySelector("#register-password");
  console.log("noo");
  console.log(username.value);
  console.log(email.value);
  console.log(registerPassword.value);
  await axios.post("http://localhost:1337/api/auth/local/register", {
    username: username.value,
    email: email.value,
    password: registerPassword.value,
  });
  alert("User has been created! Please login :) ");
};
let renderUser = async () => {
  try {
    if (sessionStorage.getItem("token")) {
      //http://localhost:1337/api/users/me?populate=deep,3
      let response = await axios.get(
        "http://localhost:1337/api/users/me?populate=deep,3",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      //console.log(response.data);
      //addToRead(3,1);
    }
  } catch (error) {
    console.log(error);
    console.log("error vid getUser");
  }
};
let login = async () => {
  try {
    // let loginIdentifier = document.querySelector("#identifier").value;
    // let loginPassword = document.querySelector("#password").value;
    let loginIdentifier = "Ernst";
    let loginPassword = "Abcd1234";
    let response = await axios.post(`${API_BASE}/auth/local`, {
      identifier: loginIdentifier,
      password: loginPassword,
      //Add .value
    });
    sessionStorage.setItem("token", response.data.jwt);
    sessionStorage.setItem("loginId", response.data.user.id);
    await renderUser();
    checkLoginStatus(loginIdentifier); //.value
    addToRead(3, 1);
    // loginIdentifier.value = "";
    // loginPassword.value = "";
  } catch (error) {
    console.log(error);
    console.log("error vid inlogg");
  }
};


getBooks();
setColorTheme();
login();
