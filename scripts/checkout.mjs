import { API_RAINY_DAYS } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

// Cart array to store added products
let cart = [];

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
  productPrice.textContent = `$${product.price}`;
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

// Display products in cart summary
function displayProductsInCart() {
  const summaryContainer = document.getElementById("summary-container");
  summaryContainer.innerHTML = "";
  cart.forEach(product => {
    const productHTML = generateCartSummaryHTML(product);
    summaryContainer.appendChild(productHTML);
  });
}

// This function is called whenever the page is loaded
async function displayCartSummary() {
  try {
    const products = await doFetch(API_RAINY_DAYS);
    displayProductsInCart(products);
  } catch (error) {
    console.log(error);
  }
}

displayCartSummary();