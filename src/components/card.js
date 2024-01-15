import { initialCards } from "../scripts/cards.js";
import { handleOpenPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;

const popupTemplate = document.querySelector(".popup_type_image");

export function initCards(placesList) {
  // @todo: Вывести карточки на страницу
  initialCards.forEach((item) => {
    const card = createCard(item);
    placesList.append(card);
  });
}

// Функция создания карточки
export function createCard(cardItem) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardsLiked = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = cardItem.name;
  cardElement.querySelector(".card__image").src = cardItem.link;
  cardElement.querySelector(".card__image").alt = cardItem.name;
  deleteButton.addEventListener("click", function (event) {
    deleteCard(event);
  });

  cardImage.addEventListener("click", function (evt) {
    if (evt.target === deleteButton) {
      return;
    }
    imageOpenCard(cardItem);
  });

  cardsLiked.addEventListener("click", function (evt) {
    likeClick(evt, cardsLiked); //лайк
  });

  // Функция открытия попапа картинки
  function imageOpenCard(cardItem) {
    const popupImage = popupTemplate.querySelector(".popup__image");
    const popupCaption = popupTemplate.querySelector(".popup__caption");

    popupImage.src = cardItem.link;
    popupCaption.textContent = cardItem.name;
    popupImage.alt = cardItem.name;
    handleOpenPopup(popupTemplate);
  }

  // Функция удаления карточки
  function deleteCard(event) {
    const imageElement = event.target.closest(".places__item");
    imageElement.remove();
  }

  //Функция лайка карточки
  function likeClick(evt, button) {
    button.classList.toggle("card__like-button_is-active"); //лайк
  }

  return cardElement;
}
