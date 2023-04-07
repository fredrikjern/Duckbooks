console.log("hejdå");

// Async functions
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
    console.log(loginIdentifier.value);
    console.log(loginPassword.value);
    let response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: loginIdentifier.value,
      password: loginPassword.value,
    });
    sessionStorage.setItem("token", response.data.jwt);
    console.log(response.data);
  } catch (error) {
    console.log("error vid inlogg");
  }
  //checkLoginStatus();
};
let checkLoginStatus = () => {
  if (sessionStorage.getItem("token")) {
    document.querySelector("#login-container").classList.add("hidden");
    //document.querySelector("#form-container").classList.remove("hidden");
    document.querySelector("#product-list").classList.remove("hidden");
  }
};
let getBooks = async () => {
  try {
    let response = await axios.get("http://localhost:1337/api/books");
    renderBooks(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

//! Render functions
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
  console.log(loginButton);
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
    console.log(book.attributes.Title);
    let b = createElement("li", book.attributes.Title);
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
