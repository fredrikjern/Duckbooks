export function createElement(type, innerHTML) {
  let element = document.createElement(`${type}`);
    if (innerHTML) element.innerHTML = innerHTML;
    return element
}
