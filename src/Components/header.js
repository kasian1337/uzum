export function Header() {
  document.addEventListener("DOMContentLoaded", function () {
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

    let back = document.createElement("button");
    let img = document.createElement("img");
    back.classList.add("back");
    img.src = "/left.png";
    back.appendChild(img);

    function deflatingList() {
      modal.innerHTML = `
      <div class="modal-window">
        <div class="btns">
          ${back}
          <button class="close" popovertarget="modal">х</button>
        </div>
        <h1>Введите код</h1>
        <p>
          Для подтверждения телефона отправили <br />
          5-значный код на <span class="tel">+998 99 999-99-99</span>
        </p>
        <div class="number-container">
          <div><input type="tel" /></div>
          <div><input type="tel" /></div>
          <div><input type="tel" /></div>
          <div><input type="tel" /></div>
          <div><input type="tel" /></div>
        </div>
        <p class="else-code">
          Если код не придёт, можно получить <br />
          новый через <span>150</span>сек
        </p>
      </div>`;
    }

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close");
    closeBtn.setAttribute("popovertarget", "modal");
    closeBtn.textContent = "х";

    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.setAttribute("type", "submit");
    btn.textContent = "Получить код";

    function mainList() {
      modal.innerHTML = `
      <div id="modal" popover class="modal-window">
        ${closeBtn}
        <h1>Введите номер телефона</h1>
        <p>Отправим смс с кодом подтверждения</p>
        <form name="reg">
          <div class="ui-input">
            <div class="slot-before">+998</div>
            <input type="tel" id="phoneInput" maxlength="12" placeholder="00 000-00-00" name="telephone" />
          </div>
          ${btn}
        </form>
        <p class="policy">
          Авторизуясь, вы соглашаетесь c
          <a href="#">политикой <br> обработки персональных данных</a>
        </p>
      </div>`;

      // Перемещаем сюда, чтобы гарантировать доступ к phoneInput
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
    }

    let isBtnClicked = false;

    back.disabled = true;
    btn.disabled = true;

    const openDiv = document.querySelector(".open-modal");
    const backdrop = document.getElementById("modal-backdrop");

    openDiv.addEventListener("click", () => {
      backdrop.style.display = "block"; // Показать модальное окно
      modal.querySelector(".modal-window").style.display = "block";
      btn.disabled = false;
      mainList();
    });

    closeBtn.addEventListener("click", () => {
      backdrop.style.display = "none"; // Скрыть модальное окно
      modal.querySelector(".modal-window").style.display = "none";
      isBtnClicked = false;
      back.disabled = true;
      btn.disabled = true;
    });

    btn.onclick = () => {
      deflatingList();
      isBtnClicked = true;
      back.disabled = false;
      btn.disabled = true;
    };

    back.onclick = () => {
      mainList();
      isBtnClicked = false;
      back.disabled = true;
      btn.disabled = false;
    };

    let logo = document.querySelector(".logo");
    logo.onclick = () => {
      window.location.href = "/";
    };
  });
}
