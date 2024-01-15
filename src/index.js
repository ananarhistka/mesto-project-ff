// index.js
import "./styles/index.css";
import { initCards, createCard } from "./components/card.js";
import { handleOpenPopup } from "./components/modal.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const logoImage = new URL("./images/logo.svg", import.meta.url);
const avatarImage = new URL("./images/avatar.jpg", import.meta.url);

const whoIsTheGoat = [
  { name: "Logo", link: logoImage },
  { name: "Avarat", link: avatarImage },
];

//***
const editProfilePopup = document.querySelector(".popup_type_edit");
const createCardPopup = document.querySelector(".popup_type_new-card");

const editProfileButton = document.querySelector(".profile__edit-button"); //кнопка добавления профиля карточки
const createCardButton = document.querySelector(".profile__add-button");

//Функция открытия и редактирование профиля
editProfileButton.addEventListener("click", () => {
  const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
  const jobInput = editProfilePopup.querySelector(
    ".popup__input_type_description"
  );

  const currentNameElement = document.querySelector(".profile__title");
  const currentJobElement = document.querySelector(".profile__description");

  function open() {
    nameInput.value = currentNameElement.textContent;
    jobInput.value = currentJobElement.textContent;
  }

  function submit() {
    currentNameElement.textContent = nameInput.value;
    currentJobElement.textContent = jobInput.value;
  }
  function close() {}

  handleOpenPopup(editProfilePopup, open, submit, close);
});

createCardButton.addEventListener("click", () => {
  const cardNameInput = document.querySelector(".popup__input_type_card-name");
  const urlInput = document.querySelector(".popup__input_type_url");

  function open() {
    cardNameInput.value = null;
    urlInput.value = null;
  }

  function submit() {
    const newCard = createCard({
      name: cardNameInput.value,
      link: urlInput.value,
    });

    placesList.prepend(newCard);
  }

  function close() {}

  handleOpenPopup(createCardPopup, open, submit, close);
});

initCards(placesList);
