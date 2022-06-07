const storeButton = document.getElementById('store-btn');
const retrieveButtton = document.getElementById('retrieve-btn');

storeButton.addEventListener('click', () => {
  const userId = 'lalosaid';
  const user = { name: 'Said', age: 28 };
  document.cookie = `uid=${userId}; max-age=10`;
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrieveButtton.addEventListener('click', () => {
  console.log(document.cookie);
  const cookieData = document.cookie.split(';');
  const data = cookieData.map( i => {
    return i.trim();
  })
  console.log(data);
  console.log(data[1].split('=')[1]); // user value
});