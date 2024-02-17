import { displayTotalCost } from "./checkout.mjs";

// Find the remove button/buttons and give them the remove function
export function findRemoveButton() {
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach(removeButton => {
    removeButton.addEventListener("click", removeItem);
  });
}

function removeItem(event) {
  const clickedButton = event.currentTarget;
  clickedButton.parentElement.remove();
  console.log("removed");
  console.log(clickedButton.parentElement.id);

  // id for removed item
  const removedItemId = clickedButton.parentElement.id;
  // index of the removed item in localStorage
  const currentCart = JSON.parse(localStorage.getItem("cart"));
  const removedItemIndex = currentCart.findIndex(product => product.id === removedItemId);
  currentCart.splice(removedItemIndex, 1);
  // save the data in localStorage (in JSON data)
  localStorage.setItem("cart", JSON.stringify(currentCart));

  displayTotalCost();
}
