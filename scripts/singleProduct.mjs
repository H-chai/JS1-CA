import { pageLoading } from "./loading.mjs";
import { findAddButton } from "./singlePageAddToCart.mjs";

function generateSingleProductHTML(product) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");

  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("image-wrapper");
  const itemImage = document.createElement("img");
  itemImage.classList.add("item-image");
  itemImage.src = product.image;
  itemImage.alt = product.description;

  imageWrapper.appendChild(itemImage);

  const textWrapper = document.createElement("div");
  textWrapper.classList.add("text-wrapper");
  const itemName = document.createElement("h2");
  itemName.classList.add("item-name");
  itemName.textContent = product.title;
  const itemPrice = document.createElement("p");
  itemPrice.classList.add("item-price");
  itemPrice.textContent = product.price;

  const sizeWrapper = document.createElement("div");
  sizeWrapper.classList.add("size-wrapper");
  const size = document.createElement("p");
  size.classList.add("size");
  size.textContent = "Size";

  const productDataJSON = localStorage.getItem("selectedProduct");
  const productDataJS = JSON.parse(productDataJSON);
  const sizeArray = productDataJS.sizes;
  const sizeList = document.createElement("ul");
  sizeList.classList.add("size-list");
  sizeArray.forEach(size => {
    const listItem = document.createElement("li");
    listItem.textContent = size;
    sizeList.appendChild(listItem);
  })
  
  sizeWrapper.append(size, sizeList);

  const itemDescription = document.createElement("p");
  itemDescription.classList.add("item-description", "description-desktop");
  itemDescription.textContent = product.description;

  const ctaWishlist = document.createElement("div");
  ctaWishlist.classList.add("cta-wishlist");
  const linkCheckout = document.createElement("a");
  linkCheckout.classList.add("cta-link-checkout");
  linkCheckout.href = "../checkout.html";
  const ctaButton = document.createElement("button");
  ctaButton.classList.add("cta", "checkout-cta");
  ctaButton.textContent = "Add to bag";
  linkCheckout.appendChild(ctaButton);

  const wishIcon = document.createElement("i");
  wishIcon.classList.add("fa-regular", "fa-heart", "wish-icon");
  //arial-label = "Add to wishlist" tabindex = "0"

  ctaWishlist.append(linkCheckout, wishIcon);

  const guaranteeCondition = document.createElement("div");
  guaranteeCondition.classList.add("condition");
  const checkIcon = document.createElement("i");
  checkIcon.classList.add("fa-regular", "fa-circle-check", "condition-icon");
  const guaranteeLink = document.createElement("a");
  guaranteeLink.classList.add("condition-link");
  guaranteeLink.textContent = "Guarantee & Free Returns";

  guaranteeCondition.append(checkIcon, guaranteeLink);

  const shippingCondition = document.createElement("div");
  shippingCondition.classList.add("condition");
  const shippingIcon = document.createElement("i");
  shippingIcon.classList.add("fa-solid", "fa-truck-fast", "condition-icon");
  const shippingLink = document.createElement("a");
  shippingLink.classList.add("condition-link");
  shippingLink.textContent = "Shipping & Returns";

  shippingCondition.append(shippingIcon, shippingLink);

  const itemDescriptionMobile = document.createElement("p");
  itemDescriptionMobile.classList.add("item-description", "description-mobile");
  itemDescription.textContent = product.description;

  textWrapper.append(itemName, itemPrice, sizeWrapper, itemDescription, ctaWishlist, guaranteeCondition, shippingCondition, itemDescriptionMobile);

  itemContainer.append(imageWrapper, textWrapper);

  return itemContainer;
}

function displaySingleProduct(products) {
  const singleProductContainer = document.querySelector(".single-product-container");
  products.forEach(product => {
    const singleProductHTML = generateSingleProductHTML(product);
    singleProductContainer.appendChild(singleProductHTML);
  })
}

// This function is called whenever the page is loaded
async function displaySingleProductPage() {
  try {
    const productDataLocalStorage = localStorage.getItem("selectedProduct");
    const selectedProductData = JSON.parse(productDataLocalStorage);
    if (selectedProductData) {
      displaySingleProduct([selectedProductData]);
      findAddButton();
    }
    pageLoading();
  } catch (error) {
    console.log(error);
  }
}

displaySingleProductPage();