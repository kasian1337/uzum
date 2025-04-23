import {
    Header
} from "../../Components/header";
import {
    api
} from "../../services/api";

Header()

let id = localStorage.getItem('userId')
let form = document.forms.userData
const inputs = document.querySelectorAll('.input-container input');
let btnGroup = document.querySelector('.btn-group')
let phoneInput = document.getElementById('phone')
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
inputs.forEach(input => {
    input.addEventListener('input', () => {
        const clearBtn = input.parentElement.querySelector('.clear-input');

        if (input.value.trim() !== '') {
            clearBtn.classList.remove('notactive');
            btnGroup.classList.remove('notactive');
        } else {
            clearBtn.classList.add('notactive');
            btnGroup.classList.add('notactive');
        }
    });
    api.get(`/users/${id}`)
        .then(res => {
            document.querySelector('h1').textContent = `${res.data.name} ${res.data.lastname}`;
            document.getElementById('lastname').value = res.data.lastname || '';
            document.getElementById('name').value = res.data.name || '';
            document.getElementById('patronymic').value = res.data.patronymic || '';
            document.getElementById('birthdate').value = res.data.birthdate || '';
            document.getElementById('phone').value = res.data.telephone || '';
            document.getElementById('email').value = res.data.email || '';
        })
        .catch(error => console.error(error));
});
const clearButtons = document.querySelectorAll('.clear-input');

clearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.value = '';
        input.classList.remove('notempty');
        btn.classList.add('notactive');
        input.focus();
    });
});
let selectedGender;

const maleBtn = document.getElementById('male');
const femaleBtn = document.getElementById('female');

maleBtn.addEventListener('click', () => {
  selectedGender = 'Мужчина';
});

femaleBtn.addEventListener('click', () => {
  selectedGender = 'Женщина';
});
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let formDataObject = {
        telephone: document.getElementById('phone').value,
        name: document.getElementById('name').value,
        lastname: document.getElementById('lastname').value,
        patronymic: document.getElementById('patronymic').value,
        birthdate: document.getElementById('birthdate').value,
        email: document.getElementById('email').value,
        floor: selectedGender
    };
    api.patch(`/users/${id}`, formDataObject)
        .catch(error => console.error(error));
})
let logOut = document.querySelector('#log-out')
logOut.addEventListener('click', () => {
    localStorage.removeItem('userId')
    window.location.replace('/')
})