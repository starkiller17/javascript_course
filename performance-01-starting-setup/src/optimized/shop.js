import { products } from './products';
import { renderProducts } from './rendering';

function addProduct(event) {
  event.preventDefault();
  import('./product-management.js').then(mod => { // The promise return a module
    mod.addProduct(event); // Forward the event object
  });
};

function deleteProduct(productId) {
  import('./product-management.js').then(mod => { // The promise return a module
    mod.deleteProduct(productId); // Forward the event object
  });
};

export function initProducts() {
  renderProducts(products, deleteProduct);
}

const addProductForm = document.getElementById('new-product');

initProducts();

addProductForm.addEventListener('submit', addProduct);
