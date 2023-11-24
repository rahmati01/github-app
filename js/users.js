 // select DOM element
 const userInfo = document.querySelector(".wrapper");
 const userLogin = window.location.hash.slice(1);

 if (userLogin) {
     const fetchUser = async (user) => {
         const response = await fetch(`https://api.github.com/users/${user}`);
         const data = await response.json();
         console.log(data);
         userRender(data);
     }

     fetchUser(userLogin);
 }

 //user render
 const userRender = (user) => {
     userInfo.innerHTML = `
     <div class="user-info">
     <div class="user-info-left">
         <img src="${user.avatar_url}" alt="${user.name}">
         <h3>${user.name}</h3>
         <h3>${user.location}</h3>
     </div>

     <div class="user-info-right">
         <p>${user.hireable ? "<span class='green'>I am hireable</span>" : "<span class='red'>I am Not hireable</span>"}</p>
         <p><strong>Bio:</strong> ${user.bio} </p>
         <a href="${user.html_url}">Visit GitHub Page</a>
         <p><strong>Login:</strong> ${user.login}</p>
         <p><strong>Company:</strong> ${user.company ? user.company : "No company"}</p>
         <p> <strong>Website:</strong> ${user.html_url}</p>
     </div>
 </div>
 <ul class="user-info-footer">
     <li><strong>Followers:</strong> ${user.followers}</li>
     <li><strong>Folloing:</strong> ${user.following}</li>
     <li><strong>Public Repos:</strong> ${user.public_repos}</li>
     <li><strong>Public Gists :</strong> ${user.public_gists}</li>
 </ul>`;
 }
