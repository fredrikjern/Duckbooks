export function createElement(type, text, classname){
  let element = document.createElement(type);
  if (text) element.innerHTML = text;
  if (classname) element.classList.add(classname);
  return element;
};
export function checkLoginStatus(username){
  if (sessionStorage.getItem("token")) {
    renderNavbar(username);
    renderPostLogin(username);
    document.getElementById("form-container").classList.add("none");
  }
};