import { API_BASE } from "./constant.js";
import { get, renderGrade, addToRead } from "./api.js";
import { render, renderNavbar } from "./render.js";
export var loginUsername = null;
export var userData = null;
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
    if (sessionStorage.getItem("token")) renderloggedInPage();
    // loginIdentifier.value = "";
    // loginPassword.value = "";

    // let a = await get("/to-reads/");
    // console.log(a);
  } catch (error) {
    console.log(error);
    console.log("error vid inlogg");
  }
}
export async function renderloggedInPage() {
  userData = await get("/users/me?populate=deep,3");
  console.log(userData);
  let { username } = userData;
  loginUsername = username;
  let upperSection = document.querySelector(".upper-section");

  renderNavbar();
  render(generateLoggedInPage(), upperSection, 500);
  renderLoggedInBookList();
}

async function renderLoggedInBookList() {
  // ? console.log("logged in book loist");
  let lowerSection = document.querySelector(".lower-section");
  lowerSection.innerHTML = "";
  let avgGrade = 3.5;
  let response = await axios.get("http://localhost:1337/api/books?populate=*");
  //console.log(response.data.data);
  response.data.data.forEach((book) => {
    let grade = renderGrade(avgGrade);
    let { Title, Author, Pages, releaseDate, cover } = book.attributes;
    let li = document.createElement("li");
    li.innerHTML = `
                  <div><img src="http://localhost:1337${cover.data.attributes.url}" height="100" /></div>
                  <div>
                  <h3> ${Title} </h3>
                  <h4> ${Author} </h4>
                  <p> This book was released in ${releaseDate} and contains ${Pages} pages</p>
                  <p>Rating: ${grade}</p>
                  </div>
                  `;
    lowerSection.append(li);
    let button = document.createElement("button");
    button.innerHTML = "Add";
    li.append(button);
    button.addEventListener("click", (event) => {
      event.preventDefault();
      addToRead(`${book.id}`);
    });
  });
}
function generateLoggedInPage() {
  let html = `
<h2> Welcome to back ${loginUsername}! </h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt facere possimus! Iusto ab cupiditate adipisci eveniet nesciunt non, impedit illum eius consequatur labore quibusdam inventore soluta architecto dicta?</p>
    <div>
    Check your reading list under my Profile or browse books below!
    </div>
  
`;
  return html;
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
