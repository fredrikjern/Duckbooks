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
      let response = await axios.get(
        "http://localhost:1337/api/users/me?populate=deep,3",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    console.log("error vid getUser");
  }
};
let login = async () => {
  try {
    // let loginIdentifier = document.querySelector("#identifier");
    // let loginPassword = document.querySelector("#password");
    let loginIdentifier = "Ernst";
    let loginPassword = "Abcd1234"
    let response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: loginIdentifier,
      password: loginPassword,
      //Add .value
    });
    sessionStorage.setItem("token", response.data.jwt);
    sessionStorage.setItem("loginId", response.data.user.id);
    await renderUser();
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
      notClicked = false;
      login();
    } else {
      console.log("Someones trigger-happy");
    }
  });
};
let renderBooks = (data) => {
  let bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  data.forEach((book) => {
    let avgGrade = 3.5;
    let grade = renderGrade(avgGrade);
    let { Title, Author, Pages, releaseDate, cover } = book.attributes;
    let text = `
        <div><img src="http://localhost:1337${cover.data.attributes.url}" height="100" /></div>
        <div>
        <h3> ${Title} </h3>
        <h4> ${Author} </h4>
        <p> This book was released in ${releaseDate} and contains ${Pages} pages</p>
        <p>Rating: ${grade}</p>
        </div>
    `;
    let b = createElement("li", text, "book-card");
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
setColorTheme();
login()
let renderGrade = (averageGrade) => {
  let ducks = [];
  for (let index = 1; index < 6; index++) {
    let duckFill = "hsl(55, 71%, 57%)";

    if (index > averageGrade) {
      if (Math.abs(averageGrade - index) < 1) {
        //console.log(Math.abs(averageGrade - index));
        //duckFill = `linear-gradient(90deg, rgba(223,213,53,1) 16%, rgba(0,0,0,1) 45%`;
        duckFill = "red";
      } else {
        duckFill = "#000000";
      }
    }

    let duck = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512.001 512.001" xml:space="preserve">
<g>
	<g>
		<path fill="${duckFill}" d="M492.977,219.06c-11.854-6.513-25.73-6.081-37.119,1.151c-32.916,20.896-79.957,30.239-136.975,27.373
			c12.867-20.341,19.778-43.956,19.778-68.435c0-70.739-57.551-128.291-128.29-128.291C143.111,50.86,87.847,102.229,82.513,168.579
			c-10.914,10.909-37.836,34.276-71.473,38.288c-4.67,0.557-8.636,3.684-10.264,8.096c-1.629,4.413-0.65,9.366,2.539,12.825
			c1.592,1.727,37.457,39.74,105.634,39.738c2.705,0,5.468-0.068,8.276-0.192c0.526,0.556,1.044,1.121,1.58,1.667
			C99.389,289.846,88.36,317.1,88.141,345.661c-0.224,30.788,11.594,59.774,33.278,81.615c21.682,21.84,50.568,33.867,81.338,33.867
			h155.517c50.332,0,91.082-19.931,117.84-57.636c23.477-33.082,35.886-79.3,35.886-133.661v-18.648
			C512.001,237.823,504.712,225.509,492.977,219.06z M41.04,225.209c17.138-6.245,31.695-15.589,42.887-24.412
			c2.488,14.537,7.473,28.522,14.704,41.344C73.098,240.437,53.883,232.616,41.04,225.209z M486.954,269.847
			c0,49.136-10.812,90.342-31.265,119.164c-22.173,31.244-54.948,47.086-97.414,47.086H202.757c-24.045,0-46.62-9.399-63.563-26.467
			c-16.946-17.07-26.182-39.723-26.006-63.781c0.199-25.927,11.87-50.51,32.015-67.442c2.854-2.401,4.492-5.947,4.465-9.678
			c-0.026-3.73-1.714-7.254-4.605-9.612c-4.689-3.827-9.093-8.13-13.091-12.79c-0.001-0.001-0.003-0.004-0.005-0.006
			c-16.028-18.66-24.854-42.515-24.854-67.17c0-1.628,0.035-3.11,0.113-4.625c2.423-55.299,47.73-98.618,103.148-98.618
			c56.928,0,103.243,46.315,103.243,103.244c0,26.306-9.92,51.373-27.934,70.583c-3.257,3.474-4.262,8.495-2.594,12.956
			c1.669,4.461,5.723,7.588,10.462,8.07c72.976,7.425,133.734-2.74,175.735-29.401c5.133-3.261,9.843-1.328,11.629-0.346
			c1.816,0.998,6.039,3.989,6.039,10.187V269.847z"/>
	</g>
</g>
<g>
	<g>
		<path fill="black" d="M302.82,374.732h-10.432c-6.915,0-12.523,5.607-12.523,12.524s5.607,12.524,12.523,12.524h10.432
			c6.916,0,12.524-5.607,12.524-12.524S309.735,374.732,302.82,374.732z"/>
	</g>
</g>
<g>
	<g>
		<path fill="gray" d="M425.577,324.05c-5.768-3.817-13.538-2.238-17.355,3.53c-13.842,20.912-34.649,36.216-58.586,43.091
			c-6.649,1.91-10.488,8.847-8.58,15.494c1.576,5.494,6.585,9.07,12.029,9.07c1.145,0,2.309-0.158,3.464-0.49
			c29.662-8.52,55.429-27.463,72.559-53.34C432.924,335.638,431.344,327.867,425.577,324.05z"/>
	</g>
</g>
<g>
	<g>
		<path fill="black" d="M179.087,126.365c-6.916,0-12.524,5.607-12.524,12.524v31.434c0,6.917,5.608,12.524,12.524,12.524
			s12.524-5.607,12.524-12.524v-31.434C191.611,131.972,186.003,126.365,179.087,126.365z"/>
	</g>
</g>
</svg>
        
        `;
    ducks.push(duck);
  }
  return ducks.join("");
};
