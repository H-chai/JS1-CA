import { getTotalAmount } from "./displayCartQuantity.mjs";

// Add to cart function
export function getAndUpdateAmount(id) {
  const currentLocalStorageData = JSON.parse(localStorage.getItem("cart"));
  if (currentLocalStorageData === null) {
    return 1;
  }
  for(let i = 0; i < currentLocalStorageData.length; i++) {
    if (currentLocalStorageData[i].id === id) {
      currentLocalStorageData[i].amount++;
      localStorage.setItem("cart", JSON.stringify(currentLocalStorageData));
      return currentLocalStorageData[i].amount;
    }
  }
  return 1;
}

// Find the cart icon/buttons and give them the add function
export async function findCartIcon() {
  const cartIcons = document.querySelectorAll(".add-to-cart-icon");
  cartIcons.forEach(cartIcon => {
    cartIcon.addEventListener("click", addToCart);
  });
}

function addToCart(event) {
  const clickedCart = event.target;
  
  const productWrapper = clickedCart.closest(".product-wrapper");

  // check if the item already in cart

  if (productWrapper) {
    const itemAmount = getAndUpdateAmount(productWrapper.id);
    if (itemAmount === 1) {
      const productData = {
        image: productWrapper.querySelector(".product-image").src,
        title: productWrapper.querySelector(".product-name").textContent,
        price: productWrapper.querySelector(".product-price").textContent,
        id: productWrapper.id,
        amount: itemAmount,
        gender: productWrapper.gender,
      }
      updateCartSummary(productData);
    }
  }
  getTotalAmount();
}


export function updateCartSummary(productData) {

  const currentLocalStorageData = localStorage.getItem("cart");
  
  if (currentLocalStorageData === null) {
    // making JSON empty array
    localStorage.setItem("cart", JSON.stringify([]));
    // get current storage data in JS
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    currentCart.push(productData); // This is JS object
    // save the data in localStorage (in JSON data)
    localStorage.setItem("cart", JSON.stringify(currentCart));
  } else {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    currentCart.push(productData);
    localStorage.setItem("cart", JSON.stringify(currentCart));
  }
  
}
