
export let state = {
  currentPage: "", // Initial value for the current page
};

// Function to update the state
export function updateCurrentPage(newPage) {
  state.currentPage = newPage;
}

// Function to access the current page state
export function getCurrentPage() {
  return state.currentPage;
}
