
export function compareRate(a, b){
  return b.rate - a.rate;
};
export function compareTitle(a, b){
  const firstLetterA = a.book.Title.charAt(0).toLowerCase();
  const firstLetterB = b.book.Title.charAt(0).toLowerCase();
  if (firstLetterA < firstLetterB) {
    return -1;
  }
  if (firstLetterA > firstLetterB) {
    return 1;
  }
  return 0;
};
export function compareAuthor(a, b){
  const firstLetterA = a.book.Author.charAt(0).toLowerCase();
  const firstLetterB = b.book.Author.charAt(0).toLowerCase();
  if (firstLetterA < firstLetterB) {
    return -1;
  }
  if (firstLetterA > firstLetterB) {
    return 1;
  }
  return 0;
};