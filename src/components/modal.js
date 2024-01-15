// Функция открытия попапа
export function handleOpenPopup(popupEl, onOpenCb, onSumitCb, onCloseCb) {
  popupEl.classList.add("popup_is-animated");
  popupEl.classList.add("popup_is-opened");

  const closeButton = popupEl.querySelector(".popup__close");

  if (onOpenCb) {
    onOpenCb();
  }

  // Функция закрытия попапа при нажатии на оверлей
  popupEl.addEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      handleClosePopup();
    }
  });

  // Функция закрытия попапа при нажатии на Крестик
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      handleClosePopup();
    });
  }

  // Функция закрытия попапа при нажатии на Esc
  document.addEventListener("keydown", closePopupEsc);

  // Находим форму в DOM
  const form = popupEl.querySelector(".popup__form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  function closePopupEsc(event) {
    if (event.key === "Escape") {
      handleClosePopup();
    }
  }

  //Функция закрытия попапа
  function handleClosePopup() {
    popupEl.classList.remove("popup_is-animated");
    popupEl.classList.remove("popup_is-opened");
    popupEl.removeEventListener("click", popupEl);
    closeButton.removeEventListener("click", closeButton);
    document.removeEventListener("keydown", closePopupEsc);

    if (form) {
      form.removeEventListener("submit", handleFormSubmit);
    }
    if (onCloseCb) {
      onCloseCb();
    }
  }

  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет
  function handleFormSubmit(evt) {
    evt.preventDefault();
    if (onSumitCb) {
      onSumitCb();
    }
    handleClosePopup();
  }
}
