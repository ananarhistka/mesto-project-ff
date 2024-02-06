export function handleOpenPopup(popupTemplate) {
  popupTemplate.classList.add("popup_is-opened");
  popupTemplate.classList.add("popup_is-animated");

  popupTemplate.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupEsc);
}

export function handleClosePopup(popupTemplate) {
  popupTemplate.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closePopupEsc);
  // удаляем событие по оверлэй
  popupTemplate.removeEventListener("click", closePopupByOverlay); 
}


export function changeStatePopup(popupTemplate, isPending) {
  const buttonElement = popupTemplate.querySelector(".popup__button");
  
  if (buttonElement) {
    buttonElement.textContent = isPending ? "Сохранение..." : "Сохранить";
  }
}

export function closePopupByOverlay(event) {
  if (event && event.target === event.currentTarget) {
    handleClosePopup(event.currentTarget);
  }
}

export function closePopupByCloseButton(event) {  
  if (event.target.classList.contains("popup__close")) {  
    handleClosePopup(event.target.closest(".popup"));  
  }
}

function closePopupEsc(event) {
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    handleClosePopup(currentPopup);
  }
}

