import {cart, addToCart} from "../data/cart.js";
import {products} from '../data/products.js';

const productsGrid = document.querySelector('.js-products-grid');
const searchText = document.querySelector('.js-search-bar')
const searchButton = document.querySelector('.js-search-button')

function displayProducts(selectedProducts){
  let productsHTML = '';
// product_len = products.length;
// console.log(product_len);
  selectedProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
  `;
});
  productsGrid.innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();

    });
  });
}

displayProducts(products);

searchButton.addEventListener('click', () => {
  const text = searchText.value.trim().toLowerCase();
  let selectedProducts = [];

  if(text){
    products.forEach((product) => {
      let matchProd = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase() === text) {
          matchProd = true;
        }
      });
      
      if(matchProd){
        selectedProducts.push(product);
      }
    });
  }
  else{
    selectedProducts = products;
  }
  displayProducts(selectedProducts);
});


function updateCartQuantity(){
  
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
  
}

