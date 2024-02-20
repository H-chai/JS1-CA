import { API_RAINY_DAYS } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";
import { findCartIcon } from "./addToCart.mjs";
import { pageLoading } from "./loading.mjs";

// Get a list of products
// Display a list of products

function generateProductsHTML(product) {
  const productWrapper = document.createElement("div");
  productWrapper.classList.add("product-wrapper");
  productWrapper.id = product.id;
  productWrapper.gender = product.gender;
  productWrapper.sizes = product.sizes;
  productWrapper.description = product.description;

  const productImageWrapper = document.createElement("a");
  productImageWrapper.classList.add("product-image-wrapper");
  productImageWrapper.href = "single-product.html";
  const productImage = document.createElement("img");
  productImage.classList.add("product-image");
  productImage.src = product.image;
  productImage.alt = product.description;
  const addToFavorite = document.createElement("button");
  addToFavorite.classList.add("fa-regular", "fa-heart", "fa-2xl", "wish-icon");

  productImageWrapper.append(productImage, addToFavorite);

  const productDetailWrapper = document.createElement("div");
  productDetailWrapper.classList.add("product-detail");
  const productTitle = document.createElement("p");
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

export async function displayProducts(products) {
  // Get the products
  // For each of the products, generate HTML for the product
  const productContainer = document.querySelector(".featured-product");
  productContainer.innerHTML = "";
  products.forEach(product => {
    const productHTML = generateProductsHTML(product);
    productContainer.appendChild(productHTML);
  })
}

function generateFilterButtonsHTML() {
  const genderButtonContainer = document.getElementById("gender-filter");
  const menButton = document.createElement("button");
  menButton.classList.add("gender-button", "men-button");
  menButton.textContent = "Men's";
  const womenButton = document.createElement("button");
  womenButton.classList.add("gender-button", "women-button");
  womenButton.textContent = "Women's";
  genderButtonContainer.append(menButton, womenButton);
}

function chooseGender() {
  generateFilterButtonsHTML();
  const genderButtons = document.querySelectorAll(".gender-button");
  genderButtons.forEach(genderButton => {
    genderButton.addEventListener("click", displayFilteredProducts);
  });
}

let isMenButtonOn = false;
let isWomenButtonOn = false;

async function displayFilteredProducts(event) {
  const clickedButton = event.target;
  
  // toggling – turning buttons on and off with each click
  if (clickedButton.classList.contains("men-button")) {
    isMenButtonOn = !isMenButtonOn;
    isWomenButtonOn = false;
    document.querySelector(".women-button").classList.remove("on-click");
  } else if (clickedButton.classList.contains("women-button")) {
    isWomenButtonOn = !isWomenButtonOn;
    isMenButtonOn = false;
    document.querySelector(".men-button").classList.remove("on-click");
  }

  if (isMenButtonOn || isWomenButtonOn) {
    clickedButton.classList.add("on-click");
    const allProducts = await doFetch(API_RAINY_DAYS);
    const filteredProducts = 
    isMenButtonOn
    ? allProducts.filter(product => product.gender === "Male")
    : allProducts.filter(product => product.gender === "Female");
  
    displayProducts(filteredProducts);
    selectProduct();
  } else {
    clickedButton.classList.remove("on-click");
    const allProducts = await doFetch(API_RAINY_DAYS);

    displayProducts(allProducts);
    selectProduct();
  }
}

// Get selected product and set into localStorage
function selectProduct() {
  const clickedProducts = document.querySelectorAll(".product-image-wrapper");
  clickedProducts.forEach(product => {
    product.addEventListener("click", event => {
      showSinglePage(event);
    });
  })
}

function showSinglePage (event) {
  const clickedProduct = event.currentTarget;
  const productWrapper = clickedProduct.closest(".product-wrapper");
  const productData = {
    image: productWrapper.querySelector(".product-image").src,
    title: productWrapper.querySelector(".product-name").textContent,
    price: productWrapper.querySelector(".product-price").textContent,
    id: productWrapper.id,
    gender: productWrapper.gender,
    sizes: productWrapper.sizes,
    description: productWrapper.description,
  }
  localStorage.setItem("selectedProduct", JSON.stringify(productData));
}

// This function is called whenever the page is loaded
async function main() {
  try {
    const products = await doFetch(API_RAINY_DAYS);
    pageLoading();
    displayProducts(products);
    findCartIcon();
    chooseGender();
    selectProduct();
  } catch (error) {
    console.log(error);
  }
}

main();
