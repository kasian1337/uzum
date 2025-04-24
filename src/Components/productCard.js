import {
  api
} from "../services/api";

export function CreateProductCardElement(product) {
  const productCard = document.createElement("div");
  productCard.className = "product-card";


  const likeIcon = document.createElement("img");
  likeIcon.className = "like";
  likeIcon.src = "/like.svg";
  likeIcon.alt = "Like";
  const id = localStorage.getItem("userId");
  likeIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    const users = api.get(`users/${id}`);
    const goods = api.get(`goods`);

    Promise.all([users, goods])
      .then(([users, goods]) => {
        const userData = users.data;

        if (userData.favorites[product.id]) {
          likeIcon.src = "/like.svg";

          delete userData.favorites[product.id];

          api.patch(`users/${id}`, userData);

          localStorage.removeItem(`liked-${product.id}`);
        } else {
          likeIcon.src = "/like-bg.png";

          userData.favorites[product.id] = true;

          api.patch(`users/${id}`, userData);

          localStorage.setItem(`liked-${product.id}`, 'true');
        }
      });
  });

  window.addEventListener("load", () => {
    const isLiked = localStorage.getItem(`liked-${product.id}`);

    if (isLiked === 'true') {
      likeIcon.src = "/like-bg.png";
    } else {
      likeIcon.src = "/like.svg";
    }
  });



  const productImage = document.createElement("img");
  productImage.className = "poster";
  productImage.src = product.media[0];
  productImage.alt = "Product";

  productCard.appendChild(likeIcon);
  productCard.appendChild(productImage);

  const dataProduct = document.createElement("div");
  dataProduct.className = "data-product";

  const productName = document.createElement("p");
  productName.className = "product-name";
  productName.textContent = product.title;

  const between = document.createElement("div")
  between.className = "between"

  const priceContainer = document.createElement("div");
  priceContainer.className = "price";

  const priceSpan = document.createElement("span");
  priceSpan.textContent = null;
  const priceP = document.createElement("p");
  priceP.textContent = product.price + ' ' + 'сумм';

  priceContainer.appendChild(priceSpan);
  priceContainer.appendChild(priceP);

  const cartIconContainer = document.createElement("div");
  cartIconContainer.className = "img";
  cartIconContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    api.get(`users/${id}`)
      .then(res => {
        const userData = res.data;

        userData.basket[product.id] = true;

        return api.patch(`users/${id}`, userData);
      })
      .then(res => {
      })
      .catch(error => console.error(error));
  });

  const cartIcon = document.createElement("img");
  cartIcon.src = "/shopping-cart.svg";
  cartIcon.alt = "Cart";

  productCard.onclick = () => {
    window.location.href = "/src/pages/cardProduct/";
    localStorage.setItem("productId", product.id);
  };
  cartIconContainer.appendChild(cartIcon);

  dataProduct.appendChild(productName);
  between.appendChild(priceContainer);
  between.appendChild(cartIconContainer);
  dataProduct.appendChild(between)

  productCard.appendChild(dataProduct);


  return productCard;
}