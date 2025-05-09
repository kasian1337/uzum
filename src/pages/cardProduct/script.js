import { CreateProductCardElement } from "../../Components/productCard";
import { render } from "../../libs/utils";
import { api } from "../../services/api";
import { Header } from "/src/Components/header.js";

Header();

let productId = localStorage.getItem("productId");
let userId = localStorage.getItem("userId");
const product = api.get("goods");
let similarCards = document.querySelector(".similar-cards");
Promise.all([product])
  .then(([product]) => {
    let filterData = product.data.filter((item) => item.id === productId);
    let type = filterData[0].type;
    render(
      product.data.filter((item) => item.type === type).slice(0, 5),
      similarCards,
      CreateProductCardElement
    );
    data(filterData[0]);
  })
  .catch((error) => console.error(error));

function data(data) {
  let imgScrol = document.querySelector(".img-scrol");
  let imgProduct = document.querySelector(".img-product");
  imgProduct.src = data.media[0];
  data.media.forEach((item) => {
    let img = document.createElement("img");
    img.src = item;
    imgScrol.appendChild(img);
    img.onclick = () => {
      imgProduct.src = item;
    };
  });
  let productName = document.querySelector("h1");
  productName.textContent = data.title;

  let productPrice = document.querySelector(".price p");
  productPrice.textContent = data.price + ' ' + "сумм";

  let productSpan = document.querySelector(".price span");
  productSpan.textContent = null;

  let description = document.querySelector(".description");
  description.textContent = data.description
}

const decreaseButton = document.querySelector(".decreasing");
const increaseButton = document.querySelector(".increase");
const countDisplay = document.querySelector(".count");

let count = 0;

function updateDisplay() {
  countDisplay.textContent = count;
}

decreaseButton.addEventListener("click", () => {
  if (count > 0) {
    count--;
    updateDisplay();
  }
});

increaseButton.addEventListener("click", () => {
  count++;
  updateDisplay();
});
const basket = document.querySelector(".basket");

basket.addEventListener("click", () => {
  api.get(`users/${userId}`)
    .then((res) => {
      const userData = res.data;
      userData.basket[productId] = true;
      console.log(userData);
      
      return api.patch(`users/${userId}`, userData);
    })
    .catch((error) => console.error(error));
})
const favorite = document.querySelector(".favorites");

favorite.addEventListener("click", () => {
  api.get(`users/${userId}`)
    .then((res) => {
      const userData = res.data;
      userData.favorites[productId] = true;
      
      return api.patch(`users/${userId}`, userData);
    })
    .catch((error) => console.error(error));
})