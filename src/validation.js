//добавляет класс с ошибкой.
const showInputError = (element, textErrorElement) => {
  element.classList.add("popup__input_type_error");
  textErrorElement.classList.add("form__input-error_active");
};

// удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove("popup__input_type_error");
  textErrorElement.classList.remove("form__input-error_active");
  textErrorElement.textContent = "";
};

//проверяет ваидность
const isValid = (controlElement, textErrorElement) => {
  if (!controlElement.validity.valid) {
    showInputError(controlElement, textErrorElement);
  } else {
    hideInputError(controlElement, textErrorElement);
  }
};

const setEventListeners = (options, formElement) => {
  const inputList = document.querySelectorAll(options.inputErrorClass);
  const buttonElement = formElement.querySelector(
    options.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

export function enableValidation(options) {
  const formList = document.querySelectorAll(options.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
