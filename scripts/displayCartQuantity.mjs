export function getTotalAmount() {
  const quantityContainer = document.querySelector(".quantity-container");
  const quantityText = document.createElement("p");
  quantityText.classList.add("quantity-text");
  quantityContainer.appendChild(quantityText);
  
  const currentLocalStorageData = JSON.parse(localStorage.getItem("cart"));
  
  let totalAmount = 0;
  for(let i = 0; i < currentLocalStorageData.length; i++) {
    const itemAmountPerItem = currentLocalStorageData[i].amount;
    totalAmount = totalAmount + itemAmountPerItem;
  }
  quantityText.textContent = totalAmount;

}

getTotalAmount();

