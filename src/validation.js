import { logPlugin } from "@babel/preset-env/lib/debug";

export function enableValidation(options) {
  const formList = document.querySelectorAll(options.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      const textErrorElement = document.querySelector(
        "." + inputElement.id + "-error"
      );
      checkInputValidity(inputElement, textErrorElement);

      toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
    });
  });
};

//добавляет класс с ошибкой.
const showInputError = (element, textErrorElement) => {
  element.classList.add("popup__input_type_error");
  textErrorElement.classList.add("form__input-error_active");
  textErrorElement.textContent = element.validationMessage;
};

// удаляет класс с ошибкой
const hideInputError = (element, textErrorElement) => {
  element.classList.remove("popup__input_type_error");
  textErrorElement.classList.remove("form__input-error_active");
  textErrorElement.textContent = "";
};

//проверяет ваидность
const checkInputValidity = (controlElement, textErrorElement) => {
  if (controlElement.validity.patternMismatch) {
    controlElement.setCustomValidity(controlElement.dataset.errorMessage);
  } else if (controlElement.validity.valueMissing) {
    controlElement.setCustomValidity("Вы пропустили это поле.");
  } else if (controlElement.validity.typeMismatch) {
    controlElement.setCustomValidity(controlElement.dataset.errorMessage);
  } else {
    controlElement.setCustomValidity("");
  }

  if (!controlElement.validity.valid) {
    showInputError(
      controlElement,
      textErrorElement,
      controlElement.validationMessage
    );
  } else {
    hideInputError(controlElement, textErrorElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

export function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));

  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    const textErrorElement = document.querySelector(
        "." + inputElement.id + "-error"
    );
    hideInputError(inputElement, textErrorElement);
    inputElement.setCustomValidity("");
  });
}

const config = {
  rbaseUrl: 'https://nomoreparties.co/v1/wff-cohort-5/cards', 
  headers: {
    authorization: '94d09f29-1e03-4124-b242-cae4038f357c',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
