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
