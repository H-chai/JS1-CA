import { displayTotalCost } from "./checkout.mjs";

export function changeInputValue() {
  const inputTags = document.querySelectorAll(".cart-quantity");
  inputTags.forEach(inputTag => {
    inputTag.addEventListener("input", updateTotalCost);
  })
}

function updateTotalCost(event) {
  const currentLocalStorageData = JSON.parse(localStorage.getItem("cart"));
  const changedInputTag = event.target;
  const changedInputValue = changedInputTag.value;
  const changedInputProductId = changedInputTag.closest(".cart-product").id;

  for (let i = 0; i < currentLocalStorageData.length; i++) {
    if (currentLocalStorageData[i].id === changedInputProductId) {
      currentLocalStorageData[i].amount = changedInputValue;
      localStorage.setItem("cart", JSON.stringify(currentLocalStorageData));
      displayTotalCost();
    }
  }
}