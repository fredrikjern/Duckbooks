
export let state = {
  currentPage: "about", // Initial value for the current page
};

// Function to update the state
export function updateCurrentPage(newPage) {
  state.currentPage = newPage;
}

// Function to access the current page state
export function getCurrentPage() {
  return state.currentPage;
}

// Update the current page state
// const currentPage = "about"; // Assume 'about' is the currently viewed page
// updateCurrentPage(currentPage);

// // Access the current page state from any component
// const currentViewedPage = getCurrentPage();
// console.log("Current viewed page:", currentViewedPage);