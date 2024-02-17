// Add to cart function
export function addToCart(event) {
  const clickedCart = event.target;
  
  const productWrapper = clickedCart.closest(".product-wrapper");

  if (productWrapper) {
    const productData = {
      image: productWrapper.querySelector(".product-image").src,
      title: productWrapper.querySelector(".product-name").textContent,
      price: productWrapper.querySelector(".product-price").textContent,
      id: productWrapper.id,
    }
    
    updateCartSummary(productData);
    console.log("added cart!");
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
    console.log(currentCart);
  }

}
