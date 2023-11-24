         //select DOM elements
         const form = document.querySelector("form");
         const userList = document.querySelector("#users");
         const searchInput = document.querySelector("#search");
         const clearListButton = document.querySelector("#clearList");
         const spinner = document.querySelector(".spinner");
         const alertParagraph = document.querySelector("#alert");
 
         // fetch user from github api
         const fetchUser = async (userName) => {
             spinner.style.display = "block";
             try {
                 const response = await fetch(`https://api.github.com/search/users?q=${userName}`);
                 const { items } = await response.json();
                 return items;
             } catch (error) {
                 console.log(error);
             } finally {
                 spinner.style.display = "none";
             }
         }
 
 
 
         // submit form * fetch user * render user
         form.addEventListener("submit", async (event) => {
             event.preventDefault();
             const searchValue = searchInput.value.trim();
             if (searchValue) {
                 const users = await fetchUser(searchValue);
 
                 // render user 
                 userList.innerHTML = ``;
                 for (const user of users) {
                     userList.innerHTML += ` <li>
                     <img src="${user.avatar_url}" alt="${user.login}">
                     <h2>${user.login}</h2>
                     <a href="/users.html#${user.login}">Read More</a>
                 </li>`;
                 }
                 searchInput.value = ``;
                 clearListButton.style.display = "block";
             } else {
                 alertParagraph.style.display = "block";
                 clearListButton.style.display = "none";
                 setTimeout(() => {
                     alertParagraph.style.display = "none";
                 }, 5000)
 
             }
 
         })
 
         clearListButton.addEventListener("click", function () {
             userList.innerHTML = ``;
             this.style.display = "none";
         })
 