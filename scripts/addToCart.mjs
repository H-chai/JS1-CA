// Add to cart function
export function addToCart(event) {
  const clickedCart = event.target;
  console.log(clickedCart);
  
  const productWrapper = clickedCart.closest(".product-wrapper");

  if (productWrapper) {
    const productImage = productWrapper.querySelector(".product-image");
    const productTitle = productWrapper.querySelector(".product-name");
    const productPrice = productWrapper.querySelector(".product-price");

    console.log("Product Image:", productImage.src);
    console.log("Product Title:", productTitle.textContent);
    console.log("Product Price:", productPrice.textContent);
  } else {
    console.error("Product container not found");
  }

}


