//import { displayProducts } from "./home.mjs";
//import { displayProductsByGender } from "./home.mjs";

// function generateFilterButtonHTML() {
//   const genderButtonContainer = document.getElementById("gender-filter");
//   const menButton = document.createElement("button");
//   menButton.classList.add("gender-button", "mens-button");
//   menButton.textContent = "Men's";
//   const womenButton = document.createElement("button");
//   womenButton.classList.add("gender-button", "women-button");
//   womenButton.textContent = "Women's";
//   genderButtonContainer.append(menButton, womenButton);
// }

// export function chooseGender() {
//   generateFilterButtonHTML();
//   const genderButtons = document.querySelectorAll(".gender-button");
//   genderButtons.forEach(genderButton => {
//     genderButton.addEventListener("click", displayFilteredProducts);
//   });
// }

// let isOnclick = false;

// function displayFilteredProducts(event) {
//   isOnclick = !isOnclick;

//   if (isOnclick) {
//     event.target.classList.add("on-click");
//     displayProductsByGender();
//   } 
  
// }