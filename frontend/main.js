// Async  APIfunctions
let getBooks = async () => {
  try {
    let response = await axios.get("http://localhost:1337/api/books?populate=*");
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
}
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
let login = async () => {
  try {
    let loginIdentifier = document.querySelector("#identifier");
    let loginPassword = document.querySelector("#password");
    let response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: loginIdentifier.value,
      password: loginPassword.value,
    });
    sessionStorage.setItem("token", response.data.jwt);
    checkLoginStatus(loginIdentifier.value);
    loginIdentifier.value = "";
    loginPassword.value = "";
  } catch (error) {
    console.log(error);
    console.log("error vid inlogg");
  }
};
let checkLoginStatus = (username) => {
  if (sessionStorage.getItem("token")) {
    renderNavbar(username);
    renderPostLogin(username);
    document.getElementById("form-container").classList.add("none");
  }
};
let logout = () => {
  sessionStorage.setItem("token", "");
  let navbar = document.querySelector("#navbar");
  navbar.innerHTML = "";
  renderLandinpage();
};

//! Render functions
let renderNavbar = (username) => {
  let navbar = document.querySelector("#navbar");
  navbar.innerHTML = `
              <ul>
                <li>
                    <a href="#">My Profile</a>
                </li>
                <li>
                    <button onclick="logout()">Log out</button> <span class="display-username"> ${username} </span>
                </li>
            </ul>
    `;
};
let renderPostLogin = (username) => {
  let messageContainer = document.querySelector(".message-container");
  messageContainer.innerHTML = ` 
             <h2> Welcome to back ${username}! </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt facere possimus! Iusto ab cupiditate adipisci eveniet nesciunt non, impedit illum eius consequatur labore quibusdam inventore soluta architecto dicta?</p>
            <div>
                Check your reading list under my Profile or browse books!
            </div>
            `;
};
let renderLandinpage = () => {
  let messageContainer = document.querySelector(".message-container");
  messageContainer.innerHTML = `            
            <h2> Welcome to Duckbooks </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt facere possimus! Iusto ab cupiditate adipisci eveniet nesciunt non, impedit illum eius consequatur labore quibusdam inventore soluta architecto dicta?</p>
            <div class="choices">
                <div><button id="render-login-button" onclick="renderLogin()">Login</button></div>
                <div> <p>Or</p></div>
                <div><button id="register-button" onclick="renderRegister()">Register</button></div>
            </div>`;
};
let renderRegister = () => {
  let formContainer = document.getElementById("form-container");
  formContainer.innerHTML = `
    <h2>Register</h2>
            <label for="register-username">Username
                <input type="text" id="register-username" />
            </label>
            <label for="password"> Password

                <input type="password" id="register-password" />
            </label>
            <label for="email"> Email
                <input type="email" id="email" />
            </label>
            <button id="login" onclick="register()">Register</button>
    `;
  formContainer.classList.remove("none");
};
let renderLogin = () => {
  let formContainer = document.getElementById("form-container");
  formContainer.innerHTML = `
    <h2>Login</h2>
            <label for="identifier">Username
                <input type="text" id="identifier" />
            </label>
            <label for="password"> Password
                <input type="password" id="password" />
            </label>
            <button id="login-button">Login</button>
    `;
  formContainer.classList.remove("none");
  let notClicked = true;
  let loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (notClicked) {
      console.log("lci");
      notClicked = false;
      login();
    }
  });
};
let renderBooks = (data) => {
  let bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    data.forEach((book) => {

        let { Title, Author, Pages, releaseDate, cover } = book.attributes;
        console.log(cover.data.attributes.url);
        let text = `
        <div><img src="http://localhost:1337${cover.data.attributes.url}" height="100" /></div>
        <div>
        <h3> ${Title} </h3>
        <h4> ${Author} </h4>
        <p> This book was released in ${releaseDate} and contains ${Pages} pages</p>
        </div>
    `;
    let b = createElement("li", text,"book-card");
    bookList.append(b);
  });
};

// ? Helper functions
let createElement = (type, text, classname) => {
  let element = document.createElement(type);
  if (text) element.innerHTML = text;
  if (classname) element.classList.add(classname);
  return element;
};

getBooks();
setColorTheme()