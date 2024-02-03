// index.js
import "./styles/index.css";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";
import {
  closePopupByCloseButton,
  handleClosePopup,
  handleOpenPopup,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation";
import {
  appendNewCard,
  getCards,
  updateProfile,
  getUser,
  likeCardUser
} from "./components/api";

const placesList = document.querySelector(".places__list");

//***

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const createCardButton = document.querySelector(".profile__add-button");
const createCardPopup = document.querySelector(".popup_type_new-card");

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");

const popupImageTemplate = document.querySelector(".popup_type_image");
const popupImage = popupImageTemplate.querySelector(".popup__image");
const popupCaption = popupImageTemplate.querySelector(".popup__caption");

// Forms
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let user;

// Listeners
profileForm.addEventListener("submit", editProfileSubmit);
cardForm.addEventListener("submit", createCardSubmit);
document.addEventListener("click", (event) => {
  closePopupByCloseButton(event);
});

createCardButton.addEventListener("click", () => {
  handleOpenPopup(createCardPopup);
  clearValidation(cardForm, validationConfig);
});

editProfileButton.addEventListener("click", () => {
  handleOpenPopup(editProfilePopup);
  clearValidation(profileForm, validationConfig);
  profileForm.elements.name.value = profileTitle.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
  profileForm.elements.name.dispatchEvent(new Event("input"));
});

// init Popups

async function editProfileSubmit(event) {
  event.preventDefault();

  const response = await updateProfile({
    name: profileForm.elements.name.value,
    about: profileForm.elements.description.value,
  });
  console.log("[response]", response);

  profileTitle.textContent = response.name;
  profileDescription.textContent = response.about;

  fillProfile(response.name, response.about);

  handleClosePopup(editProfilePopup);
}

function fillProfile(name, about) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
}
async function createCardSubmit(event) {
  event.preventDefault();

  const formValue = {
    name: cardForm.elements["place-name"].value,
    link: cardForm.elements.link.value,
  };

  const response = await appendNewCard(formValue);

  renderCard(response, user._id, "shift");

  handleClosePopup(createCardPopup);
  cardForm.reset();
}

async function loadCards(userId) {
  const initialCards = await getCards();
  initialCards.forEach((item) => {
    renderCard(item, userId);
  });
}

function renderCard(cardModel, userId, pushOrShift = "push") {
  const cardElement = createCard(
    cardModel,
    handleDeleteCard,
    handleLikeCard,
    handleOpenCard,
    userId,
  );

  if (pushOrShift === "push") {
    placesList.append(cardElement);
  } else {
    placesList.prepend(cardElement);
  }
}

function handleOpenCard(cardItem) {
  popupImage.src = cardItem.link;
  popupImage.alt = cardItem.name;
  popupCaption.textContent = cardItem.name;
  handleOpenPopup(popupImageTemplate);
}

enableValidation(validationConfig);

async function initApp() {
  user = await getUser().catch((error) => {
    console.log("Ошибка получения данных о пользователе:", error);
  });

  console.log("[user]", user);
  loadCards(user._id);
}

initApp();

