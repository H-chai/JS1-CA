import { API_RAINY_DAYS } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

// Get a list of products
// Display a list of products

function generateProductsHTML(product) {
  const productWrapper = document.createElement("div");
  productWrapper.classList.add("product-wrapper");

  const productImageWrapper = document.createElement("div");
  productImageWrapper.classList.add("product-image-wrapper");
  const productImage = document.createElement("img");
  productImage.classList.add("product-image");
  productImage.src = product.image;
  const addToFavorite = document.createElement("button");
  addToFavorite.classList.add("fa-regular", "fa-heart", "fa-2xl", "wish-icon");

  productImageWrapper.append(productImage, addToFavorite);

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
  const addToCartIcon = document.createElement("button");
  addToCartIcon.classList.add("fa-solid", "fa-cart-plus", "fa-xl", "add-to-cart-icon");

  priceWrapper.append(productPrice, addToCartIcon);

  productDetailWrapper.append(productTitle, priceWrapper);

  productWrapper.append(productImageWrapper, productDetailWrapper);
  
  return productWrapper;
}

async function displayProducts(products) {
  // Get the products ✅
  // For each of the products, generate HTML for the product
  const productContainer = document.querySelector(".featured-product");
  console.log(productContainer);
  products.forEach(product => {
    const productHTML = generateProductsHTML(product);
    productContainer.appendChild(productHTML);
  })
}


// This function is called whenever the page is loaded
async function main() {
  try {
    const products = await doFetch(API_RAINY_DAYS);
    displayProducts(products);
    console.log(products);
  } catch (error) {
    console.log(error);
  }
}

main();