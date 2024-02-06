

function disableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
}

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
      const textErrorElement = document.querySelector("." + inputElement.id + "-error");
      checkInputValidity(inputElement, textErrorElement, options);
      toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
    });
  });
};

const showInputError = (element, textErrorElement, options) => {
  element.classList.add(options.inactiveButtonClass);
  textErrorElement.classList.add(options.errorClass);
  textErrorElement.textContent = element.validationMessage;
};

const hideInputError = (element, textErrorElement, options) => {
  element.classList.remove(options.inactiveButtonClass);
  textErrorElement.classList.remove(options.errorClass);
  textErrorElement.textContent = "";
};

function checkInputValidity(controlElement, textErrorElement, options) {   
  if (!controlElement.validity.valid) {     
    showInputError(controlElement, textErrorElement, options);   
  } else {     
    hideInputError(controlElement, textErrorElement, options);   
  } 
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

export function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    const textErrorElement = document.querySelector("." + inputElement.id + "-error");
    hideInputError(inputElement, textErrorElement, validationConfig);
    inputElement.setCustomValidity("");
  });

  disableSubmitButton(buttonElement, validationConfig.inactiveButtonClass);
}