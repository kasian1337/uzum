export function Header() {
  let header = document.querySelector("header");

  header.innerHTML = `
    <img class="logo" src="/logo.svg" alt="">
    <button class="open">Каталог</button>
    <input type="text" placeholder="Искать товары">
    <div class="navigation">
      <div class="open-modal" popovertarget="modal" tabindex="0" >
        <img src="/user.svg" alt="">
        <p>Войти</p>
      </div>
      <div>
        <a href="/src/pages/favoritesList/index.html">Избранное</a>
      </div>
      <div>
        <a href="/src/pages/basketLIst/index.html">Корзина</a>
      </div>
    </div>`;

  let modal = document.querySelector(".modal-container");

  modal.innerHTML = `
    <div id="modal" popover class="modal-window">
      <button class="close" popovertarget="modal">х</button>
      <h1>Введите номер телефона</h1>
      <p>Отправим смс с кодом подтверждения</p>
      <form name="reg">
      <div class="ui-input">
        <div class="slot-before">+998</div>
        <input type="tel" id="phoneInput" maxlength="12" placeholder="00 000-00-00" />
      </div>
      <button class="btn" type="submit">Получить код</button>
      </form>
      <p class="policy">
        Авторизуясь, вы соглашаетесь c
        <a href="#">политикой <br> обработки персональных данных</a>
      </p>
    </div>`;

  const phoneInput = document.querySelector("#phoneInput");

  phoneInput.addEventListener("input", function () {
    let digits = this.value.replace(/\D/g, "");

    digits = digits.substring(0, 9);

    let formatted = "";
    if (digits.length > 0) {
      formatted += digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formatted += " " + digits.substring(2, 5);
    }
    if (digits.length > 5) {
      formatted += "-" + digits.substring(5, 7);
    }
    if (digits.length > 7) {
      formatted += "-" + digits.substring(7, 9);
    }

    this.value = formatted;
  });

  let form = document.forms.reg;
  form.onsubmit = (e) => {
    e.preventDevault();
    let user = {
      telephone: phoneInput.value
    };
    console.log(phoneInput.value);
    
  };
  const openDiv = document.querySelector(".open-modal");
  const closeBtn = document.querySelector(".close");
  const backdrop = document.getElementById("modal-backdrop");

  openDiv.addEventListener("click", () => {
    backdrop.hidden = false;
    modal.querySelector(".modal-window").style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    backdrop.hidden = true;
    modal.querySelector(".modal-window").style.display = "none";
  });

  let logo = document.querySelector(".logo");
  logo.onclick = () => {
    window.location.href = "/";
  };
}
