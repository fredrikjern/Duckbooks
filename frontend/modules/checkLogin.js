let checkLoginStatus = (username) => {
  if (sessionStorage.getItem("token")) {
    renderNavbar(username);
    renderPostLogin(username);
    document.getElementById("form-container").classList.add("none");
  }
};
