
console.log("hej");

let login = async () => {
  let loginIdentifier = document.querySelector("#identifier");
  let loginPassword = document.querySelector("#password");
  let response = await axios.post("http://localhost:1337/api/auth/local", {
    identifier: loginIdentifier.value,
    password: loginPassword.value,
  });
  sessionStorage.setItem("token", response.data.jwt);
  //checkLoginStatus();
};

const checkLoginStatus = () => {
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
getBooks();
let renderBooks = (data) => {
    let bookList = document.getElementById("book-list");
    bookList.innerHTML=""
  data.forEach((book) => {
      console.log(book.attributes.Title);
      let b = createElement("li", book.attributes.Title);
        bookList.append(b)
  });
};

let createElement = (type, text, classname) => {
  let element = document.createElement(type);
  if (text) element.innerHTML = text;
    if (classname) element.classList.add(classname);
    return element
};
