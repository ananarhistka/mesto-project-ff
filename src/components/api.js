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

const getUserInfo = () =>
  sendRequest("/users/me").then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
getUserInfo();
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
// Promise.all([getUserInfo, getCards])
//     .then(([userInfo, cards]) => {
//         console.log(userInfo);
//         console.log(cards);
//     })
//     .catch(error => {
//         console.log('Ошибка получения данных:', error);
//     });
// const url = `https://nomoreparties.co/v1/${cohortId}`;
// const data = {
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
// };

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

export function deleteCardId() {
  return fetch(baseUrl + "/cards/", {
    method: "GET",
    headers: {
      Authorization: "94d09f29-1e03-4124-b242-cae4038f357c",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => data)
    .catch((err) => console.log(`Ошибка ${err}`));
}

export const getUser = () => {
  return fetch(baseUrl + "/users/me", {
    method: "GET",
    headers: "94d09f29-1e03-4124-b242-cae4038f357c",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

export async function showPICards(createCard, showCard, placesList) {
  const userId = await getUser().then((user = user._id));
  getCards()
    .then((addCard) => {
      addCard.forEach((card) => {
        placesList.append(
          createCard(
            card.name,
            card.link,
            card.likes.length,
            showCard,
            card.owner._id,
            userId
          )
        );
      });
    })
    .catch((err) => console.log(`Ошибка ${err} `));
}
