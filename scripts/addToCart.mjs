// Find the cart icon/buttons and give them the add function
async function findCartIcon() {
  const cartIcons = document.querySelectorAll(".add-to-cart-icon");
  cartIcons.forEach(cartIcon => {
    cartIcon.addEventListener("click", addToCart);
  });
  console.log("Event listeners set up");
  console.log(cartIcons);
}

// Add to cart function
function addToCart(event) {
  const clickedCart = event.target;
  
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

  //const productImage = productWrapper.querySelector(".product-image").src;
  //const productTitle = productWrapper.querySelector(".product-name").textContent;
  //const productPrice = productWrapper.querySelector(".product-price").textContent;

  // const productData = {
  //   image: productImage,
  //   title: productTitle,
  //   price: productPrice,
  // };

}

findCartIcon();


