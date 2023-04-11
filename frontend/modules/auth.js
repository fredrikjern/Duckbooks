import { API_BASE } from "./constant.js";
import { get } from "./api.js";
import { render } from "./render.js";
export async function login() {
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
    // console.log(response.data.jwt);
    // console.log(response.data.user);
    if (sessionStorage.getItem("token")) loggedInPage();

    // loginIdentifier.value = "";
    // loginPassword.value = "";
  } catch (error) {
    console.log(error);
    console.log("error vid inlogg");
  }
}
async function loggedInPage() {
  let loggedIn = true;
  let data = await get("/users/me?populate=deep,3");
  console.log(data);
  let { username } = data;
  let navbar = document.querySelector("#navbar");
  let upperSection = document.querySelector(".upper-section");
  render(generateNavbar(username), navbar, 500, loggedIn);
  render(generateLoggedInPage(username), upperSection, 500),
    console.log(username);
}
function generateLoggedInPage(username) {
  let html = `
<h2> Welcome to back ${username}! </h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt facere possimus! Iusto ab cupiditate adipisci eveniet nesciunt non, impedit illum eius consequatur labore quibusdam inventore soluta architecto dicta?</p>
    <div>
    Check your reading list under my Profile or browse books below!
    </div>
  
`;
  return html;
}
function generateNavbar(username) {
  let links = `
    <ul>
    <li>
    <button id="my-profile-button">My Profile</button>
    </li>
    <li>
    <button id="logout-button">Log out</button> <span class="display-username"> ${username} </span>
                </li>
                </ul>
                `;
  return links;
}

export async function register() {
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
}
export function logout() {
  sessionStorage.setItem("token", "");
  let navbar = document.querySelector("#navbar");
  navbar.innerHTML = "";
  renderLandinpage();
}
