import { getCurrentPage, updateCurrentPage } from "./stateHandling.js";
import { render } from "./render.js";
import { getBooks } from "./api.js";
import { timeout } from "./constant.js";
import { renderNavbar } from "./navbar.js";
export async function renderAllBooks() {
  updateCurrentPage("all-books");
  console.log(getCurrentPage());
    render(await getBooks(), ".upper-section", timeout);
    renderNavbar()
}
