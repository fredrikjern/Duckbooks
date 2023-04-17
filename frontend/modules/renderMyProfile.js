import { render } from "./render.js";
import { deleteToRead,addRating,addToRead } from "./api.js";
import { userData } from "./auth.js";
import { timeout } from "./constant.js";
import { compareAuthor,compareRate,compareTitle } from "./compare.js";
export async function renderMyProfile() {
  let html = `
  <div>
  <h2>${userData.username}'s Profile  </h2>
  </div>
  <div>
    <h3>To read list</h3>
    <ul id="to-read-list-list"> </ul> 
  </div>
  <div>
    <details style="margin:9px">
        <summary style="display: flex; align-items: center;">
             <h3>You have rated these books &#x25BE;</h3>
        </summary>
               Sort by: <select id="list-sort">
            <option value="Rating">Rating</option>
            <option value="Title">Title</option>
            <option value="Author">Author</option>
        </select>
       <ul id="rated-list"></ul>
    </details>  
  </div>
  `;

  render(html, "upper", timeout, appendReadList);
}

function appendRatedList(sortBy) {
  let ratedList = document.getElementById("rated-list");
  ratedList.innerHTML = "";
  let list;
  if (sortBy === "Rating") {
    list = [...userData.ratings].sort(compareRate);
  } else if (sortBy === "Title") {
    list = [...userData.ratings].sort(compareTitle);
  } else if (sortBy === "Author") {
    list = [...userData.ratings].sort(compareAuthor);
  } else {
    list = [...userData.ratings].sort(compareRate);
  }

  list.forEach((book) => {
    let li = document.createElement("li");
    let div = document.createElement("div");
    div.innerHTML = `
      <b>Title:</b> ${book.book.Title} <b>Author:</b> ${book.book.Author} <b>Rating:</b> ${book.rate}/5 ducks
        `;
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    div.append(removeButton);
    li.append(div);
    ratedList.append(li);
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      let endpoint = `/ratings/${book.id}`;
      deleteToRead(endpoint);
      removeButton.parentNode.parentNode.remove();
    });
  });
}
function appendReadList() {
  let toReadList = document.getElementById("to-read-list-list");
  userData.to_reads.forEach((book) => {
    let li = document.createElement("li");
    let div = document.createElement("div");
    div.innerHTML = `
      Title: ${book.book.Title}
        `;
    let buttonDiv = document.createElement("div");
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    buttonDiv.append(removeButton);
    li.append(div, buttonDiv);
    toReadList.append(li);
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      let endpoint = `/to-reads/${book.id}`;
      deleteToRead(endpoint);
      removeButton.parentNode.parentNode.remove();
    });
    //eventlistener
  });
  appendRatedList();
  let select = document.getElementById("list-sort");
  select.addEventListener("change", (event) => {
    event.preventDefault();
    console.log("cha");
    appendRatedList(document.getElementById("list-sort").value);
  });
  console.log(select.value);
}
