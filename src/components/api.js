const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-30',
    headers: {
      authorization: '8b39e515-006e-454d-8b99-c084c827ce05',
      'Content-Type': 'application/json',
    },
  };

function getResponseData (res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
} 
  
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
      .then((res) => getResponseData(res));
  };
  
  export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about }),
    })
     .then((res) => getResponseData(res));
  };
  
  export const updateUserAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) => getResponseData(res));
  };
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then((res) => getResponseData(res));
  };
  
  export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link }),
    })
    .then((res) => getResponseData(res));
  };
  
  export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then((res) => getResponseData(res));
  };
  
  export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then((res) => getResponseData(res));
  };
  
  export const dislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then((res) => getResponseData(res));
  };
  