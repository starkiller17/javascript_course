const storeButton = document.getElementById('store-btn');
const retrieveButtton = document.getElementById('retrieve-btn');

let db;

// Creates the DB or opens the connection
const dbRequest = indexedDB.open('StorageDummy', 1);

dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

// Runs when the DB is created for first time or the version changes
dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;

  const objStore = db.createObjectStore('products', {keyPath: 'id'});
  
  objStore.transaction.oncomplete = function(event) {
    // Can be readonly or readwrite
    const productStore = db
      .transaction('products', 'readwrite')
      .objectStore('products');
    productStore.add({
      id: 'p1',
      title: 'A first product',
      price: 12.99,
      tags: ['Expensive', 'Luxury']
    });
  }
};

dbRequest.onerror = function (event) {
  console.log('ERROR');
};

storeButton.addEventListener('click', () => {
  if (!db) {
    return;  
  }
  const productStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
    productStore.add({
      id: 'p2',
      title: 'A second product',
      price: 19.99,
      tags: ['Expensive', 'Luxury']
    });
  
});

retrieveButtton.addEventListener('click', () => {
  const productStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
  const request = productStore.get('p2');

  request.onsuccess = function() {
    console.log(request.result);
  }
});