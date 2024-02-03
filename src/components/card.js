import { addLikes, deleteLikes, deleteCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  cardItem,
  deleteCardFn,
  likeCardFn,
  openCardFn,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCount = cardElement.querySelector(".card__like-counter");
  cardElement.dataset.userId = userId;

  likeCount.textContent = cardItem.likes.length;
  const hasLike = (cardItem.likes || []).find(item => item._id === userId);
  if (hasLike) {
    likeButton.classList.add(
      "card__like-button_is-active"
    )
  }

  cardTitle.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  if (userId === cardItem.owner._id) {
    deleteButton.addEventListener("click", () => {
      deleteCardFn(cardElement, cardItem._id);
    });
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener("click", () => {
    openCardFn(cardItem);
  });

  likeButton.addEventListener("click", () =>
    likeCardFn(likeButton, likeCount, cardItem._id)
  );
  return cardElement;
}

export function handleDeleteCard(cardElement, cardId) {
  cardElement.remove();
  cardElement = null;
  deleteCard(cardId);
}

export async function handleLikeCard(likeButton, likeCount, cardId) {
  const newCardState = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? await deleteLikes(cardId)
    : await addLikes(cardId);

  console.log('[newCardState]', newCardState);
  likeCount.textContent = newCardState.likes.length;
  likeButton.classList.toggle("card__like-button_is-active");
}
