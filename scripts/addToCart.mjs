// Add to cart function
function getAndUpdateAmount(id) {
  const currentLocalStorageData = JSON.parse(localStorage.getItem("cart"));
  if (currentLocalStorageData === null) {
    return 1;
  }
  for(let i = 0; i < currentLocalStorageData.length; i++) {
    console.log(currentLocalStorageData[i].id == id);
    if (currentLocalStorageData[i].id === id) {
      currentLocalStorageData[i].amount++;
      console.log(currentLocalStorageData);
      localStorage.setItem("cart", JSON.stringify(currentLocalStorageData));
      return currentLocalStorageData[i].amount;
    }
  }
  return 1;
}

export function addToCart(event) {
  const clickedCart = event.target;
  
  const productWrapper = clickedCart.closest(".product-wrapper");

  // check if the item already in cart

  if (productWrapper) {
    const itemAmount = getAndUpdateAmount(productWrapper.id);
    console.log(itemAmount);
    if (itemAmount === 1) {
      const productData = {
        image: productWrapper.querySelector(".product-image").src,
        title: productWrapper.querySelector(".product-name").textContent,
        price: productWrapper.querySelector(".product-price").textContent,
        id: productWrapper.id,
        amount: itemAmount
      }
      updateCartSummary(productData);
    }

  }
}


function updateCartSummary(productData) {

  const currentLocalStorageData = localStorage.getItem("cart");

  if (currentLocalStorageData === null) {
    // making JSON empty array
    localStorage.setItem("cart", JSON.stringify([]));
    // get current storage data in JS
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    currentCart.push(productData); // This is JS object
    // console.log(currentCart);
    // save the data in localStorage (in JSON data)
    localStorage.setItem("cart", JSON.stringify(currentCart));
  } else {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    currentCart.push(productData);
    localStorage.setItem("cart", JSON.stringify(currentCart));
  }

}
