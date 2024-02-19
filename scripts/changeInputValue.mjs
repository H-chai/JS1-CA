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
  // console.log(changedInputTag);
  // console.log(changedInputValue);
  // console.log(changedInputTag.closest(".cart-product").id);
  for (let i = 0; i < currentLocalStorageData.length; i++) {
    if (currentLocalStorageData[i].id === changedInputProductId) {
      currentLocalStorageData[i].amount = changedInputValue;
      localStorage.setItem("cart", JSON.stringify(currentLocalStorageData));
      displayTotalCost();
    }
  }
}

// add event listener to input tag
// event type "input"

// function xxxx {
// まずどのinputが触られてるかを判断しないと（const newInputValue = event.target.value;）そしてそれをlocalStorageのやつと紐付けないと
// inputのvalueとlocalStorageのamountが同じになるようにする
//   input value e.target.valueがlocalStorageのamountになるようにする
//   update localStorage ... localStorage.setItem("cart", JSON.stringify(currentLocalStorageData));
//   call displayTotalCost
// }

// まずどのinputが触られてるかを判断しないと。そしてそれをlocalStorageのやつと紐付けないと
// inputのvalueとlocalStorageのamountが同じになるようにする