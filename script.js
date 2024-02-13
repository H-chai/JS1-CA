// fetch Noroff API
async function fetchProductsAPI() {
  try {
    const response = await fetch ("https://api.noroff.dev/api/v1/rainy-days");
    const data = await response.json();
    //console.log(data);
    return data;
  } catch(error) {
    console.error("Error fetching data:" + error);
  }
}

// display products function
async function displayProducts() {
  const productContainer = document.getElementsByClassName("featured-product")[0];
  const products = await fetchProductsAPI();

  if (products) {
    products.forEach(product => {
      const productWrapper = document.createElement("div");
      productWrapper.classList.add("product-wrapper");

      const productImageWrapper = document.createElement("div");
      productImageWrapper.classList.add("product-image-wrapper");
      const productImage = document.createElement("img");
      productImage.classList.add("product-image");
      productImage.src = product.image;
      const addToFavorite = document.createElement("i");
      addToFavorite.classList.add('iconify', 'wish-icon');
      addToFavorite.setAttribute("data-icon", "ph:heart-bold");

      productImageWrapper.appendChild(productImage);
      productImageWrapper.appendChild(addToFavorite);

      const productDetailWrapper = document.createElement("div");
      productDetailWrapper.classList.add("product-detail");
      const productTitle = document.createElement("a");
      productTitle.classList.add("product-name");
      productTitle.textContent = product.title;

      const priceWrapper = document.createElement("div");
      priceWrapper.classList.add("price-and-cart");
      const productPrice = document.createElement("p");
      productPrice.classList.add("product-price");
      productPrice.textContent = `$${product.price}`;
      const addToCartIcon = document.createElement("i");
      addToCartIcon.classList.add('iconify', 'add-to-cart-icon');
      addToCartIcon.setAttribute("data-icon", "mi:shopping-cart-add");

      priceWrapper.appendChild(productPrice);
      priceWrapper.appendChild(addToCartIcon);

      productDetailWrapper.appendChild(productTitle);
      productDetailWrapper.appendChild(priceWrapper);

      productWrapper.appendChild(productImageWrapper);
      productWrapper.appendChild(productDetailWrapper);
      productContainer.appendChild(productWrapper);

    });
  }
}

displayProducts();