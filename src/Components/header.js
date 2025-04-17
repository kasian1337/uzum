import {
  api
} from "./../services/api";
export function Header() {
  document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector("header");
    let id = localStorage.getItem('userId')
    header.innerHTML = `
      <div class="flex-wrapper container">
        <img class="logo" src="/logo.svg" alt="" />
        <button class="open">Каталог</button>
        <input type="text" placeholder="Искать товары" />
        <div class="navigation">
          <div class="open-modal" popovertarget="modal" tabindex="0">
            <img src="/user.svg" alt="" />
            <p class="nameAccount">Войти</p>
          </div>
          <div>
            <a href="/src/pages/favoritesList/index.html">Избранное</a>
          </div>
          <div>
            <a href="/src/pages/basketLIst/index.html">Корзина</a>
          </div>
        </div>
      </div>
      <div class="dialog-container notactive">
        <div class="dialog">
          <span>Категории товаров</span>
          <div>
            <p>Мебель</p>
            <div class="quantity-display">
              <p><span id="quantity"></span>товара</p>
            </div>
          </div>
          <div>
            <p>Компьютер</p>
            <div class="quantity-display">
              <p><span id="quantity"></span>товара</p>
            </div>
          </div>
          <div>
            <p>Аудио</p>
            <div class="quantity-display">
              <p><span id="quantity"></span>товара</p>
            </div>
          </div>
          <div>
            <p>Телевизор</p>
            <div class="quantity-display">
              <p><span id="quantity"></span>товара</p>
            </div>
          </div>
          <div>
            <p>Кухня</p>
            <div class="quantity-display">
              <p><span id="quantity"></span>товара</p>
            </div>
          </div>
        </div>
      </div>`;
    let dialogContainer = document.querySelector('.dialog-container')
    let katalogBtn = document.querySelector(".open")
    let headerBackdrop = document.querySelector("#header-backdrop")
    katalogBtn.addEventListener("click", (e) => {
      dialogContainer.classList.remove("notactive");
      headerBackdrop.style.display = "block"
    })
    let nameAccount = document.querySelector('.nameAccount')
    api.get("users")
      .then(res => {
        let data = res.data.filter((item) => item.id === id)
        data.forEach((item) => {
          nameAccount.textContent = item.name;
        })
      })
      .catch(error => console.error(error))

    let modal = document.querySelector(".modal-container");

    let back = document.createElement("button");
    let img = document.createElement("img");
    back.classList.add("back");
    img.src = "/left.png";
    back.appendChild(img);

    function generateCode() {
      return Math.floor(10000 + Math.random() * 90000);
    }
    let phoneInput;

    function deflatingList() {
      modal.innerHTML = `
      <div class="modal-window">
        <div class="btns">
          <button class="close" popovertarget="modal">х</button>
        </div>
        <h1>Введите код</h1>
        <p>
          Для подтверждения телефона отправили <br />
          5-значный код на <span class="tel"></span>
        </p>
        <div class="number-container">
          <div><input type="tel" maxlength="1" /></div>
          <div><input type="tel" maxlength="1" disabled/></div>
          <div><input type="tel" maxlength="1" disabled/></div>
          <div><input type="tel" maxlength="1" disabled/></div>
          <div><input type="tel" maxlength="1" disabled/></div>
        </div>
        <p class="else-code">
          Если код не придёт, можно получить <br />
          новый через <span>150</span>сек
        </p>
      </div>`;
      const inputs = document.querySelectorAll(".number-container input");
      inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
          const next = inputs[index + 1];
          if (input.value && next) {
            next.disabled = false;
            next.focus();
          }

          if (index === inputs.length - 1 && input.value) {
            const allFilled = Array.from(inputs).every((inp) => inp.value);
            if (allFilled) {
              DataForm();
            }
          }
        });

        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && !input.value && index > 0) {
            const prev = inputs[index - 1];
            input.disabled = true;
            prev.focus();
          }
        });
      });
      let spanTel = document.querySelector(".tel");
      spanTel.textContent = `+998 ${phoneInput.value}`;

      inputs[0].focus();
      inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
          const next = inputs[index + 1];
          if (input.value && next) {
            next.disabled = false;
            next.focus();
          }
        });

        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && !input.value && index > 0) {
            const prev = inputs[index - 1];
            input.disabled = true;
            prev.focus();
          }
        });
      });
      const code = generateCode();
      // alert(code)
      const btns = modal.querySelector(".btns");
      btns.insertBefore(back, btns.firstChild);

      back.addEventListener("click", () => {
        mainList();
        modal.querySelector(".modal-window").style.display = "block";
      });

      const close = modal.querySelector(".close");
      close.addEventListener("click", () => {
        backdrop.style.display = "none";
        modal.querySelector(".modal-window").style.display = "none";
      });
    }

    function DataForm() {
      modal.innerHTML = `
      <div class="modal-window">
      <h1>Данные пользователя</h1>
      <form name="reg">
          <div class="data-form">
            <p>Имя</p>
            <input type="text" placeholder="Имя" id="name">
          </div>
          <div class="data-form">
            <p>Фамилия</p>
            <input type="text" placeholder="Фамилия" id="lastname">
          </div>
          <button type="submit">Зарегестрироваться</button>
          </form>
          </div>`;
      let name = document.querySelector("#name");
      let lastname = document.querySelector("#lastname");
      let form = document.forms.reg;

      form.onsubmit = (e) => {
        e.preventDefault();
        let user = {
          telephone: phoneInput.value,
          name: name.value,
          lastname: lastname.value,
          favorites: {},
          basket: {},
        };
        api
          .post("users", user)
          .then((res) => {
            localStorage.setItem("userId", res.data.id)
          })
          .catch((error) => console.error(error));
        modal.style.display = 'none'
        backdrop.style.display = 'none'
      };
    }

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close");
    closeBtn.setAttribute("popovertarget", "modal");
    closeBtn.textContent = "х";

    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = "Получить код";

    function mainList() {
      modal.innerHTML = `
      <div id="modal" popover class="modal-window">
        <h1>Введите номер телефона</h1>
        <p>Отправим смс с кодом подтверждения</p>
        <form name="reg">
          <div class="ui-input">
            <div class="slot-before">+998</div>
            <input type="tel" id="phoneInput" maxlength="12" placeholder="00 000-00-00" name="telephone" />
          </div>
        </form>
        <p class="policy">
          Авторизуясь, вы соглашаетесь c
          <a href="#">политикой <br> обработки персональных данных</a>
        </p>
      </div>`;
      const modalWindow = modal.querySelector(".modal-window");
      phoneInput = document.querySelector("#phoneInput");
      let form = document.forms.reg;

      modalWindow.insertBefore(closeBtn, modalWindow.firstChild);
      form.appendChild(btn);


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

      btn.addEventListener("click", () => {
        deflatingList();
      });

      closeBtn.addEventListener("click", () => {
        backdrop.style.display = "none";
        modal.querySelector(".modal-window").style.display = "none";
      });
    }

    const openDiv = document.querySelector(".open-modal");
    const backdrop = document.getElementById("modal-backdrop");

    openDiv.addEventListener("click", () => {
      mainList();
      backdrop.style.display = "block";
      modal.querySelector(".modal-window").style.display = "block";
    });

    const logo = document.querySelector(".logo");
    logo.addEventListener("click", () => {
      window.location.href = "/";
    });
  });
}