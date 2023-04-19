export let state = {
  currentPage: "",
};
export function updateCurrentPage(newPage) {
  state.currentPage = newPage;
}
export function getCurrentPage() {
  return state.currentPage;
}
