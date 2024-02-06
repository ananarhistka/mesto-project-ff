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
  changeStatePopup,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation";
import {
  appendNewCard,
  getCards,
  updateProfile,
  getUser,
  updateAvatar,
} from "./components/api";

const placesList = document.querySelector(".places__list");

//***

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const createCardButton = document.querySelector(".profile__add-button");
const createCardPopup = document.querySelector(".popup_type_new-card");

const addNewAvatarButton = document.querySelector(
  ".profile__edit-avatar-overlay-button"
);
const createButtonPopupAvatar = document.querySelector(
  ".popup_type_new-avatar"
);
const linkPictureAvatar = document.querySelector(".img-avatar");

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");

const popupImageTemplate = document.querySelector(".popup_type_image");
const popupImage = popupImageTemplate.querySelector(".popup__image");
const popupCaption = popupImageTemplate.querySelector(".popup__caption");

// Forms
const newAvatarForm = document.forms["new-avatar"];
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
newAvatarForm.addEventListener("submit", editAvatarSubmit);

document.addEventListener("click", (event) => {
  closePopupByCloseButton(event);
});
addNewAvatarButton.addEventListener("click", () => {
  handleOpenPopup(createButtonPopupAvatar);
  clearValidation(newAvatarForm, validationConfig);
  newAvatarForm.elements.link.value = String(
    linkPictureAvatar.style.backgroundImage
  )
    .replace(/url\(\"/, "")
    .replace(/\"\)$/, "");
  newAvatarForm.elements.link.dispatchEvent(new Event("input"));
});

async function editAvatarSubmit(event) {
  event.preventDefault();

  changeStatePopup(createButtonPopupAvatar, true);
  const response = await updateAvatar({
    avatar: newAvatarForm.elements.link.value,
  });

  changeStatePopup(createButtonPopupAvatar, false);
  setUserAvatar(response.avatar);
  handleClosePopup(createButtonPopupAvatar);
}

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

  changeStatePopup(editProfilePopup, true);
  const response = await updateProfile({
    name: profileForm.elements.name.value,
    about: profileForm.elements.description.value,
  });
  changeStatePopup(editProfilePopup, false);

  profileTitle.textContent = response.name;
  profileDescription.textContent = response.about;

  fillProfile(response.name, response.about);

  handleClosePopup(editProfilePopup);
}

function fillProfile(name, about) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
}

function setUserAvatar(avatarLink) {
  linkPictureAvatar.style.backgroundImage = `url(${avatarLink}`;
}

async function createCardSubmit(event) {
  event.preventDefault();
  changeStatePopup(createCardPopup, true);
  const formValue = {
    name: cardForm.elements["place-name"].value,
    link: cardForm.elements.link.value,
  };

  const response = await appendNewCard(formValue);

  changeStatePopup(createCardPopup, false);
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
    userId
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

  setUserAvatar(user.avatar);
  fillProfile(user.name, user.about);
  loadCards(user._id);
}

initApp();
