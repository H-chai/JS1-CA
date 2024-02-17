import { API_RAINY_DAYS } from "./constants.mjs";
import { findRemoveButton } from "./deleteItem.mjs";
import { doFetch } from "./doFetch.mjs";

// Generate HTML in cart summary
function generateCartSummaryHTML(product) {
  const cartWrapper = document.createElement("div");
  cartWrapper.classList.add("cart-product");

  const cartDetail = document.createElement("div");
  cartDetail.classList.add("cart-detail");

  const productImage = document.createElement("img");
  productImage.classList.add("cart-product-image");
  productImage.src = product.image;

  const quantityWrapper = document.createElement("div");
  quantityWrapper.classList.add("quantity");

  const productTitle = document.createElement("p");
  productTitle.classList.add("product-title");
  productTitle.textContent = product.title;
  const productPrice = document.createElement("p");
  productPrice.classList.add("cart-product-price");
  productPrice.textContent = product.price;
  const quantityInput = document.createElement("input");
  quantityInput.classList.add("cart-quantity");
  quantityInput.value = "1";
  quantityInput.type = "number";

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button", "fa-solid", "fa-trash-can", "fa-2xl");

  quantityWrapper.append(productTitle, productPrice, quantityInput);
  cartDetail.append(productImage, quantityWrapper);
  cartWrapper.append(cartDetail, removeButton);

  return cartWrapper;
}

let cart = [];
// Get added items from localStorage
function getItemFromLocalStorage() {
  // localStorageからcartのdata取得(from JSON to JS)
  const currentCart = JSON.parse(localStorage.getItem("cart"));
  // we have to put this data to let cart = []
  cart.push(...currentCart);
}

// Display products in cart summary
function displayProductsInCart() {
  const summaryContainer = document.getElementById("summary-container");
  summaryContainer.innerHTML = "";

  for(let i = 0; i < cart.length; i++) {
    const productHTML = generateCartSummaryHTML(cart[i]);
    summaryContainer.appendChild(productHTML);
  };

}

// This function is called whenever the page is loaded
async function displayCartSummary() {
  try {
    const products = await doFetch(API_RAINY_DAYS);
    getItemFromLocalStorage();
    displayProductsInCart(products);
    findRemoveButton();
  } catch (error) {
    console.log(error);
  }
}

displayCartSummary();
//localStorage.removeItem("cart");