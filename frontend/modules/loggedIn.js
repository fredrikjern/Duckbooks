import { addToRead, addRating } from "./api.js";
import { userData } from "./auth.js";
import { updateData } from "./auth.js";
import { renderNavbar } from "./navbar.js";
import { render } from "./render.js"
import { timeout } from "./constant.js";
import { renderMyProfile } from "./myProfile.js";

//import { renderPage } from "./myProfile.js";

import { calculateAverageGrade, fiveDucksGrading } from "./rating.js";
export async function renderloggedInPage() {
  await updateData()
  renderNavbar();
  render(generateLoggedInPage(), ".upper-section", timeout);
  renderLoggedInBookList();
}
export async function renderLoggedInBookList() {
  let lowerSection = document.querySelector(".lower-section");
  lowerSection.innerHTML = "";
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
    lowerSection.append(li);
    let ratingDucks = document.querySelectorAll(`.duck${index}`);
    if (isNotRated(book)) {
      ratingDucks.forEach((ratingDuck, index) => {
        ratingDuck.addEventListener("click", (event) => {
          event.preventDefault();
          addRating(book.id, index);
        });
      });
    }
    if (isNotOnReadList(book)) {
      let button = document.createElement("button");
      button.innerHTML = "Add";
      li.append(button);
      button.addEventListener("click", (event) => {
        event.preventDefault();
        addToRead(`${book.id}`);
        renderPage();
      });
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
export function generateLoggedInPage() {
  let html = `
<h2> Welcome to back ${userData.username}! </h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt facere possimus! Iusto ab cupiditate adipisci eveniet nesciunt non, impedit illum eius consequatur labore quibusdam inventore soluta architecto dicta?</p>
    <div>
    Check your reading list under my Profile or browse books below!
    </div>
  
`;
  return html;
}
