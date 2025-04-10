import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Header } from "./Components/header.js";
import { api } from "./services/api.js";
import { render } from "./libs/utils.js";
import { CreateProductCardElement } from "./Components/productCard.js";

Header();

// Вот эта строка нужна обязательно:
Swiper.use([Navigation, Pagination]);

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true, // по желанию
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const product = api.get("goods");
let products = document.querySelector(".products");
let furnitureCards = document.querySelector(".furniture-cards");
let computerCards = document.querySelector(".computer-cards");
let audioCards = document.querySelector(".audio-cards");
let TVCards = document.querySelector(".TV-cards");
let kitchenCards = document.querySelector(".kitchen-cards");
Promise.all([product])
  .then(([product]) => {
    render(product.data.slice(0, 15), products, CreateProductCardElement);
    render(
      product.data.filter((item) => item.type === "furniture").slice(0, 5),
      furnitureCards,
      CreateProductCardElement
    );
    render(
      product.data.filter((item) => item.type === "PC").slice(0, 5),
      computerCards,
      CreateProductCardElement
    );
    render(
      product.data.filter((item) => item.type === "audio").slice(0, 5),
      audioCards,
      CreateProductCardElement
    );
    render(
      product.data.filter((item) => item.type === "TV").slice(0, 5),
      TVCards,
      CreateProductCardElement
    );
    render(
      product.data.filter((item) => item.type === "kitchen").slice(0, 5),
      kitchenCards,
      CreateProductCardElement
    );
  })
  .catch((error) => console.error(error));
