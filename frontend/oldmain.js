import { logout } from "./modules/logout.js";
import { copyToClipboard } from "./modules/help.js";
import {
  renderNavbar,
  createElement,
  renderBooks,
  renderGrade,
  renderLandinpage,
  renderLogin,
  renderPostLogin,
  renderRegister,
  checkLoginStatus,

} from "./modules/oldrender.js";
const API_BASE = "http://localhost:1337/api";
// Async  APIfunctions

//* Authentication functions

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

let post = async () => { 
try {
  let response = await axios.get(
    "http://localhost:1337/api/users/me?populate=deep,3",
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
} catch (error) {
  
}
  sessionStorage.setItem("token", response.data.jwt);
  console.log(response.data.jwt);
  sessionStorage.setItem("loginId", response.data.user.id);
}  




getBooks();
setColorTheme();
login();
