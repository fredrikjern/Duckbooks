
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
let logout = () => {
  sessionStorage.setItem("token", "");
  let navbar = document.querySelector("#navbar");
  navbar.innerHTML = "";
  renderLandinpage();
};
