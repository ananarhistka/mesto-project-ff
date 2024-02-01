const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(cardItem, deleteCardFn, likeCardFn, openCardFn) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  deleteButton.addEventListener("click", () => {
    deleteCardFn(cardItem._id, cardElement); 
  });

  cardTitle.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  deleteButton.addEventListener("click", () => {
    deleteCardFn(cardElement);
  });

  cardImage.addEventListener("click", (event) => {
    openCardFn(cardItem);
  });

  likeButton.addEventListener("click", () => {
    likeCardFn(likeButton);
  });

  return cardElement;
}

export function handleDeleteCard(cardElement) {
  cardElement.remove();
  cardElement = null;
}

export function handleLikeCard(cardButton) {
  cardButton.classList.toggle("card__like-button_is-active");
}

