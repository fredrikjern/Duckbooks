export function renderNavbar(username){
  let navbar = document.querySelector("#navbar");
  navbar.innerHTML = `
              <ul>
                <li>
                    <a href="#">My Profile</a>
                </li>
                <li>
                    <button onclick="logout()">Log out</button> <span class="display-username"> ${username} </span>
                </li>
            </ul>
    `;
};
