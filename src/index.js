// index.js
import "./styles/index.css";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";
import {
  closePopupByCloseButton,
  createPopup,
  handleClosePopup,
  handleOpenPopup,
} from "./components/modal.js";
import { initialCards } from "./scripts/cards";

const placesList = document.querySelector(".places__list");

const logoImage = new URL("./images/logo.svg", import.meta.url);
const avatarImage = new URL("./images/avatar.jpg", import.meta.url);

const whoIsTheGoat = [
  { name: "Logo", link: logoImage },
  { name: "Avarat", link: avatarImage },
];

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

// Listeners
profileForm.addEventListener("submit", editProfileSubmit);
cardForm.addEventListener("submit", createCardSubmit);
document.addEventListener("click", (event) => {
  closePopupByCloseButton(event);
});

function initApp() {
  loadCards(placesList);

  // init Popups
  createPopup({
    button: editProfileButton,
    popupTemplate: editProfilePopup,
    onOpened: () => {
      profileForm.elements.name.value = profileTitle.textContent;
      profileForm.elements.description.value = profileDescription.textContent;
    },
  });
  createPopup({
    button: createCardButton,
    popupTemplate: createCardPopup,
  });
}

initApp();

function editProfileSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = profileForm.elements.name.value;
  profileDescription.textContent = profileForm.elements.description.value;

  handleClosePopup(editProfilePopup);
}

function createCardSubmit(event) {
  event.preventDefault();

  const formValue = {
    name: cardForm.elements["place-name"].value,
    link: cardForm.elements.link.value,
  };

  renderCard(formValue, "shift");

  handleClosePopup(createCardPopup);
  cardForm.reset();
}

function loadCards() {
  initialCards.forEach((item) => {
    renderCard(item);
  });
}

function renderCard(cardModel, pushOrShift = "push") {
  const cardElement = createCard(
    cardModel,
    handleDeleteCard,
    handleLikeCard,
    handleOpenCard
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
