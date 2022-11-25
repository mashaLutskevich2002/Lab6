'use strict';

const loadUser = async () => {
   const response = await fetch('https://randomuser.me/api');
   const { results } = await response.json();
   return results
};

const getUser = async () => {
   const userData = await loadUser()

   const  { picture, cell, location, email} = userData[0]

   const user = {};
   user.picture = picture.large;
   user.cell = cell;
   user.city = location.city;
   user.email = email;
   user.coordinates = location.coordinates.latitude 
   user.coordinatesL = location.coordinates.longitude

   return user;
};

const getUsers = async (array, numberOfUsers) => {
   const user = await getUser();
   array.push(user);
   if (array.length === numberOfUsers) return;
   return getUsers(array, numberOfUsers)
};

const renderUsers = async () => {
   const users = []

   await getUsers(users, 5);

   const usersToRender = [];

   for (const user of users) {
      const userToRender = `
      <div class="userItem">
         <img src=${user.picture} class="img" alt=${user.name}>
         <p><b>Cell phone:</b> ${user.cell}</p>
         <p><b>Email:</b> ${user.email}</p>
         <p><b>City:</b> ${user.city}</p>
         <p><b>Coordinates:</b> ${user.coordinates + user.coordinatesL}</p>
      </div>
      `;

      usersToRender.push(userToRender)
   }

   const usersElement = document.getElementById('users')

   const usersGroup = `
      <div id="group" class="user">
         ${usersToRender.join('\n')}
      </div>
   `;

   usersElement.insertAdjacentHTML('afterbegin', usersGroup);
};

const downloadButton = document.getElementById('download');

downloadButton.addEventListener('click', renderUsers)