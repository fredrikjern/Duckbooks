import { addToRead, addRating } from "./api.js";
import { getCurrentPage, updateCurrentPage } from "./stateHandling.js";
import { userData } from "./auth.js";
import { updateData } from "./auth.js";
import { renderNavbar } from "./navbar.js";
import { render } from "./render.js";
import { timeout } from "./constant.js";
import { renderMyProfile } from "./myProfile.js";
import { calculateAverageGrade, fiveDucksGrading } from "./rating.js";
export async function renderloggedInPage() {
  updateCurrentPage("logged-in-page");
  await updateData();
  let html = `
  <div class="content-container">
    <h2> Välkommen tillbaka ${userData.username}! </h2>
    <p>Vi är glada att ha dig tillbaka på Ankademiebokhandeln! </p>
    <p>Kolla gärna runt och lägg till böcker i din Att läsa lista samt ge betyg åt böcker du har läst!</p>
    <p><button id="see-profile-button">Se Profil!</button></p>
  </div>
`;
  render(html, ".upper-section", timeout, seeProfilelistener);
  renderNavbar();
}
function seeProfilelistener() {
  let seeButton = document.getElementById("see-profile-button");

  seeButton.addEventListener("click", (event) => {
    renderMyProfile();
    seeButton.classList = "hidden";
  });
}
export async function renderLoggedInBookList() {
  updateCurrentPage("logged-in-all-books");
  let upperSection = document.querySelector(".upper-section");
  upperSection.innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("book-list");
  let ul = document.createElement("ul");
  ul.classList.add("logged-in-list");
  div.append(ul);
  upperSection.append(div);
  let response = await axios.get("http://localhost:1337/api/books?populate=*");
  response.data.data.forEach((book, index) => {
    let avgGrade = calculateAverageGrade(book.attributes.ratings.data);
    let grade = fiveDucksGrading(avgGrade, index);
    let { Title, Author, Pages, releaseDate, cover } = book.attributes;
    let li = document.createElement("li");
    li.innerHTML = `
                  <div><img src="http://localhost:1337${cover.data.attributes.url}" height="100" /></div>
                  <div>
                  <h3> ${Title} </h3>
                  <h4> ${Author} </h4>
                  <p> This book was released in ${releaseDate} and contains ${Pages} pages</p>
                  <p>Rating: ${grade}</p>
                  </div>
                  `;
    li.style.opacity = "0";
    ul.append(li);
    setTimeout(() => {
      li.style.opacity = "1";
    }, 200);

    let ratingDucks = document.querySelectorAll(`.duck${index}`);
    if (isNotRated(book)) {
      ratingDucks.forEach((ratingDuck, index) => {
        ratingDuck.addEventListener("click", (event) => {
          event.preventDefault();
          addRating(book.id, index + 1);
        });
      });
    }
    if (isNotOnReadList(book)) {
      let div = document.createElement("div");
      div.classList.add("add")
      let button = document.createElement("button");
      button.innerHTML = "Add";
      
      div.append(button);
      li.append(div);
      button.addEventListener("click", (event) => {
        event.preventDefault();
        addToRead(`${book.id}`);
        button.classList.add("hidden");
      });
    } else {
      let div = document.createElement("div");
      let button = document.createElement("button");
      button.innerHTML = "Add";
      button.classList.add("hidden");
      div.append(button);
      div.classList.add("hidden", "add");
      li.append(div);
    }
  });
}
export function isNotRated(book) {
  let ratedBooks = [];
  userData.ratings.forEach((to_read) => ratedBooks.push(to_read.book.id));
  return ratedBooks.includes(book.id) ? false : true;
}
export async function renderPage() {
  await updateData();
  renderMyProfile();
  renderLoggedInBookList();
}
export function isNotOnReadList(book) {
  let toReadIds = [];
  userData.to_reads.forEach((to_read) => toReadIds.push(to_read.book.id));
  return toReadIds.includes(book.id) ? false : true;
}
