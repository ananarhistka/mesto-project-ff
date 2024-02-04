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
  sendRequest("/cards").then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });

export const updateProfile = (data) => {
  return fetch(baseUrl + "/users/me", {
    method: "PATCH",
    ...createHeaders(),
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};
export function appendNewCard(cardInform) {
  return fetch(baseUrl + "/cards", {
    method: "POST",
    ...createHeaders(),
    body: JSON.stringify({
      name: cardInform.name,
      link: cardInform.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("err");
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}

export const getUser = () => {
  return fetch(baseUrl + "/users/me", {
    ...createHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
};

export const deleteCard = (cardId) => {
  return fetch(baseUrl + `/cards/${cardId}`, {
    method: "DELETE",
    ...createHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
};

export function addLikes(cardId) {
  return fetch(baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    ...createHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
}

export const deleteLikes = (cardId) => {
  return fetch(baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    ...createHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
};


export const updateAvatar = (data) => {
  return fetch(baseUrl + `/users/me/avatar`, {
    method: "PATCH",
    ...createHeaders(),
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};