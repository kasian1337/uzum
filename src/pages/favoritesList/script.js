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

    if (!currentUser || !currentUser.favorites) {
      console.log("Пользователь не найден или нет избранного");
      return;
    }

    const favoriteIds = Object.keys(currentUser.favorites);
    const favoriteGoods = goods.data.filter(item => favoriteIds.includes(String(item.id)));

    let containerGood = document.querySelector('div');
    
    containerGood.innerHTML = '';

    if (favoriteGoods.length === 0) {
      containerGood.style.display = 'none';
    } else {
      containerGood.style.display = 'block';
      render(favoriteGoods, containerGood, CreateProductCardElement);
    }
  })
  .catch(error => console.error(error));
