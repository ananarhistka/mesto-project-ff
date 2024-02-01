const sendRequest = (uri) => {
    const cohortId = 'wff-cohort-5';
    const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;
    return fetch(baseUrl + uri, {
        headers: {
            authorization: '94d09f29-1e03-4124-b242-cae4038f357c'
        }
    });
}

const getUserInfo = sendRequest('/users/me').then(response => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
});

export const getCards = sendRequest('/cards').then(response => {
    if (response.ok) {
        console.log(getCards)
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
});

Promise.all([getUserInfo, getCards])
    .then(([userInfo, cards]) => {
        console.log(userInfo);
        console.log(cards);
    })
    .catch(error => {
        console.log('Ошибка получения данных:', error);
    });
