const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

const sendRequest = (uri, method = "GET", body) => {
  return fetch(baseUrl + uri, {
    method,
    ...createHeaders(),
    body,
  });
};

const cohortId = "wff-cohort-5";
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

const createHeaders = (headers) => {
  return {
    headers: {
      authorization: "94d09f29-1e03-4124-b242-cae4038f357c",
      "Content-Type": "application/json",
      ...headers,
    },
  };
};

export const getCards = () =>
  sendRequest("/cards").then(handleResponse);

export const updateProfile = (data) => {
  return fetch(baseUrl + "/users/me", {
    method: "PATCH",
    ...createHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);
};

export function appendNewCard(cardInform) {
  return fetch(baseUrl + "/cards", {
    method: "POST",
    ...createHeaders(),
    body: JSON.stringify({
      name: cardInform.name,
      link: cardInform.link,
    }),
  }).then(handleResponse);
}

export const getUser = () => {
  return fetch(baseUrl + "/users/me", {
    ...createHeaders(),
  }).then(handleResponse);
};

export const deleteCard = (cardId) => {
  return fetch(baseUrl + `/cards/${cardId}`, {
    method: "DELETE",
    ...createHeaders(),
  }).then(handleResponse);
};

export function addLike(cardId) {
  return fetch(baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    ...createHeaders(),
  }).then(handleResponse);
}

export const deleteLike = (cardId) => {
  return fetch(baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    ...createHeaders(),
  }).then(handleResponse);
};

export const updateAvatar = (data) => {
  return fetch(baseUrl + `/users/me/avatar`, {
    method: "PATCH",
    ...createHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);
};