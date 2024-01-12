// index.js
import './styles/index.css'; 
import {initialCards} from './scripts/cards.js';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardItem, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  

  cardElement.querySelector(".card__title").textContent = cardItem.name;
  cardElement.querySelector(".card__image").src = cardItem.link;
  cardElement.querySelector(".card__image").alt = cardItem.name;
  deleteButton.addEventListener("click", function (event) {
    deleteCard(event);
  });
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const imageElement = event.target.closest(".places__item");
  imageElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard));
});

const logoImage = new URL('./images/logo.svg', import.meta.url);
const avatarImage = new URL('./images/avatar.jpg', import.meta.url);


const whoIsTheGoat = [
{ name: 'Logo', link: logoImage },
{ name: 'Avarat', link: avatarImage }
]

/*
const jordanImage = new URL('./images/card_1.jpg', import.meta.url);
const jamesImage = new URL('./images/card_2.jpg', import.meta.url);
const bryantImage = new URL('./images/card_3.jpg', import.meta.url);
const logoImage = new URL('./images/logo.svg', import.meta.url);

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', link: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
  { name: 'Logo', link: logoImage },
]; */