import { getAndUpdateAmount } from "./addToCart.mjs";
import { updateCartSummary } from "./addToCart.mjs";

export async function findAddButton () {
  const button = document.querySelector(".checkout-cta");
  button.addEventListener("click", addToCart);
  console.log("found");
}

function addToCart(event) {
  const addButton = event.target;
  const selectedProductLocalStorage = localStorage.getItem("selectedProduct");
  const selectedProductData = JSON.parse(selectedProductLocalStorage);
  console.log(addButton);
  console.log(selectedProductData);
  console.log(selectedProductData.id);
  const itemAmount = getAndUpdateAmount(selectedProductData.id);
  if (itemAmount === 1) {
    const productData = {
      image: selectedProductData.image,
      title: selectedProductData.title,
      price: selectedProductData.price,
      id: selectedProductData.id,
      amount: itemAmount,
      gender: selectedProductData.gender,
    }
    updateCartSummary(productData);
  }
}