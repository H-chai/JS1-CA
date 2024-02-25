import { API_RAINY_DAYS } from "./constants.mjs";
import { findRemoveButton } from "./deleteItem.mjs";
import { doFetch } from "./doFetch.mjs";
import { changeInputValue } from "./changeInputValue.mjs";
import { pageLoading } from "./loading.mjs";
import { getTotalAmount } from "./displayCartQuantity.mjs";

let cart = JSON.parse(localStorage.getItem("cart"));

// Generate HTML in cart summary
function generateCartSummaryHTML(product) {
  const cartWrapper = document.createElement("div");
  cartWrapper.classList.add("cart-product");
  cartWrapper.id = product.id;

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
  quantityInput.value = product.amount;
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

  for(let i = 0; i < cart.length; i++) {
    const productHTML = generateCartSummaryHTML(cart[i]);
    summaryContainer.appendChild(productHTML);
  };
}
// Total
function totalCost() {
  const currentCart = JSON.parse(localStorage.getItem("cart"));
  if (currentCart === null) {
    return 0;
  }
  let total = 0;
  for(let i = 0; i < currentCart.length; i++) {
    const priceString = currentCart[i].price;
    // remove $
    priceString.substring(1);
    // convert to number
    const priceNumber = Number(priceString.substring(1));
    total = total + priceNumber * currentCart[i].amount;
  }
  return total;
}

// Display total cost
export function displayTotalCost() {
  const totalCostContainer = document.getElementById("total-cost");
  const total = totalCost().toFixed(2);
  totalCostContainer.textContent = `$${total}`;
}

function showOrderConfirmation() {
  const orderButton = document.querySelector(".cta-link-purchase");
  orderButton.addEventListener("click", () => {
    const currentLocalStorageData = localStorage.getItem("cart");
    if (currentLocalStorageData === "[]") {
      alert("Your cart is empty");
    } else {
      orderButton.href = "checkout-success.html";
      localStorage.removeItem("cart");
    }
  })
}


// This function is called whenever the page is loaded
async function displayCartSummary() {
  try {
    const products = await doFetch(API_RAINY_DAYS);
    pageLoading();
    displayProductsInCart(products);
    findRemoveButton();
    changeInputValue();
    showOrderConfirmation();
    getTotalAmount();
  } catch (error) {
    console.log(error);
  }
}

displayCartSummary();
displayTotalCost();