import { render } from "./render.js";
import { updateCurrentPage, getCurrentPage } from "./stateHandling.js";
import { deleteToRead } from "./api.js";
import { updateData, userData } from "./auth.js";
import { timeout } from "./constant.js";
import { compareAuthor, compareRate, compareTitle } from "./compare.js";
export async function renderMyProfile() {
  updateCurrentPage("my-profile");
  await updateData();

  let html = `
  <div class="content-container">
  <div>
  <h2>${userData.username}'s Profile  </h2>
  </div>
  <div class="list-container">
    <div>
    <details class="to-read-list">
      <summary>
        <h3>To read list &#x25BE</h3>
      </summary>
      <ul id="to-read-list"> </ul> 
    </details>
    </div>
    <div>
      <details>
          <summary>
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
  </div>
  </div>
  `;

  render(html, ".upper-section", timeout, appendReadList);
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
    <div>
      <div><h4> ${book.book.Title} <h5></div>
      <div> <em>${book.book.Author}</em></div>
    </div>
    <div>${book.rate}/5</div>  
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
  let toReadList = document.getElementById("to-read-list");
  userData.to_reads.forEach((book) => {
    let li = document.createElement("li");
    let div = document.createElement("div");
    div.innerHTML = `
    <div>
    <div><b>${book.book.Title}</b></div>
    <div><em>${book.book.Author}</em></div>
    </div>
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
    appendRatedList(document.getElementById("list-sort").value);
  });
}
