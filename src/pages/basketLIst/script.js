import { Header } from "../../Components/header";
import { api } from "../../services/api";
import { render } from "../../libs/utils";
import { CreateProductCardElement } from "../../Components/productCard";

Header();

const user = api.get("users");
const good = api.get("goods");
let id = localStorage.getItem("userId");

Promise.all([user, good])
  .then(([users, goods]) => {
    const currentUser = users.data.find(item => item.id == id);

    if (!currentUser || !currentUser.basket) {
      console.log("Пользователь не найден или нет избранного");
      return;
    }

    const basketIds = Object.keys(currentUser.basket);
    const basketGoods = goods.data.filter(item => basketIds.includes(String(item.id)));

    const emptyState = document.getElementById("empty-state");
    const cardContainer = document.getElementById("card-container");

    if (basketGoods.length === 0) {
      emptyState.style.display = "flex";
      cardContainer.style.display = "none";
    } else {
      emptyState.style.display = "none";
      cardContainer.style.display = "grid";
      render(basketGoods, cardContainer, CreateProductCardElement);
    }
  })
  .catch(error => console.error(error));
