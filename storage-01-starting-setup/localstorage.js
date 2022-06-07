const storeButton = document.getElementById('store-btn');
const retrieveButtton = document.getElementById('retrieve-btn');

const userId = 'lalosaid';

const user = {
  name: 'Said',
  hobbies: [
    'Basketball',
    'Videogames',
    'Cooking'
  ]
};

storeButton.addEventListener('click', () => {
  sessionStorage.setItem('uid', userId);
  localStorage.setItem('user', JSON.stringify(user));
});

retrieveButtton.addEventListener('click', () => {
  const extractedId = sessionStorage.getItem('uid');
  const extractedUser = JSON.parse(localStorage.getItem('user'));

  if (extractedId && extractedUser) {
    console.log('Got the id - ' + extractedId);
    console.log(extractedUser);
  }
  else {
    console.log('Could not find ID and User.');
  }
});