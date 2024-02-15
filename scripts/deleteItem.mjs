// Find the remove button/buttons and give them the remove function
function findRemoveButton() {
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach(removeButton => {
    removeButton.addEventListener("click", removeItem);
  });
}

function removeItem(event) {
  const clickedButton = event.currentTarget;
  clickedButton.parentElement.remove();
}

findRemoveButton();