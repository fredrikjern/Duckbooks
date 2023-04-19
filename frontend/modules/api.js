import { API_BASE } from "./constant.js";
import { calculateAverageGrade, fiveDucksGrading } from "./rating.js";
import { renderLoggedInBookList } from "./loggedIn.js";
import { updateData } from "./auth.js";

export async function get(endpoint) {
  try {
    let response = await axios.get(`${API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    let data = await response.data;
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteToRead(endpoint) {
  try {
    let response = await axios.delete(`${API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    await updateData();
  } catch (error) {
    console.log(error);
  }
}
export async function addToRead(bookId) {
  try {
    let response = await axios.post(
      `${API_BASE}/to-reads`,
      {
        data: {
          book: [bookId],
          user: [sessionStorage.getItem("loginId")],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    await updateData();
  } catch (error) {
    console.log(error);
  }
}
export async function addRating(bookId, rating) {
  try {
    let response = await axios.post(
      `${API_BASE}/ratings`,
      {
        data: {
          rate: rating,
          book: [bookId],
          user: [sessionStorage.getItem("loginId")],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    renderLoggedInBookList();
  } catch (error) {
    console.log(error);
  }
}
export async function getBooks() {
  try {
    let response = await axios.get(
      "http://localhost:1337/api/books?populate=deep,4"
    );
    return generateBookList(response.data.data);
  } catch (error) {
    console.log(error);
  }
}
export function generateBookList(data) {
  let listHtml = ['<div class="book-list"><ul>'];
  data.forEach((book) => {
    let avgGrade = calculateAverageGrade(book.attributes.ratings.data);
    let grade = fiveDucksGrading(avgGrade);
    let { Title, Author, Pages, releaseDate, cover } = book.attributes;
    let text = `
            <li class=book-card>
                <div><img src="http://localhost:1337${cover.data.attributes.url}" height="100" /></div>
                <div>
                <h3> ${Title} </h3>
                <h4> ${Author} </h4>
                <p> This book was released in ${releaseDate} and contains ${Pages} pages</p>
                <p>Rating: ${grade}</p>
                </div>
            </li>
                `;
    listHtml.push(text);
  });

  listHtml.push("</ul></div>");
  return listHtml.join("");
}
export async function setColorTheme() {
  try {
    let response = await axios.get("http://localhost:1337/api/theme");
    if (!response.data.data.attributes.Lightmode) {
      console.log("Darkmode");

      document.documentElement.style.setProperty(
        "--background-color",
        "#121212"
      );
      document.documentElement.style.setProperty(
        "--text-color",
        "hsl(43, 21%, 87%)"
      );
    } else {
      console.log("Lightmode");
    }
  } catch (error) {
    console.log(error);
  }
}
