import { initProducts } from './product-management';

function addProduct(event) {
  import('./product-management.js').then(mod => { // The promise return a module
    mod.addProduct(event); // Forward the event object
  });
};

const addProductForm = document.getElementById('new-product');

initProducts();

addProductForm.addEventListener('submit', addProduct);
