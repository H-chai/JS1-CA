// Add to cart function
export function addToCart(event) {
  const clickedCart = event.target;
  
  const productWrapper = clickedCart.closest(".product-wrapper");

  if (productWrapper) {
    const productData = {
      image: productWrapper.querySelector(".product-image").src,
      title: productWrapper.querySelector(".product-name").textContent,
      price: productWrapper.querySelector(".product-price").textContent,
    }
    
    updateCartSummary(productData);
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

  //My next step is
  //- Get the data (in this case it is an array) from "cart" in localStorage
  //- Add new JS object to the array
  //- Save it "cart" in localStorage


}
// function updateCartSummary(productData) {
//   const currentCartData = localStorage.getItem("cart");

//   if (!currentCartData) {
//     console.log("localStorage is empty");
//     localStorage.setItem("cart");
//   } else {
//     const currentCartData = JSON.parse(currentCartData);
//     currentCartData.push(productData);
//   }

//   localStorage.setItem("cart", JSON.stringify(currentCartData));
// }


// localStorageに"cart"を作る
// addボタン押した時にそのデータを取得してlocalStorageに格納する

// localStorageに複数のJS objectを格納したい
// localStorageをupdateする前に既存のデータがあるか調べないと
// 既存のデータがない場合...
// 配列を作ってそこにデータを格納
// 既存のデータがある場合...
// 既存の配列にデータを追加