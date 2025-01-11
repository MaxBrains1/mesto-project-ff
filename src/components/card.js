import { likeCard, dislikeCard, deleteCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, currentUserId, handleDeleteCard, handleLikeButton, handleImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  likeCounter.textContent = cardData.likes?.length;

  if (cardData.owner?._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));
  }

  likeButton.addEventListener('click', () => handleLikeButton(cardData._id, likeButton, likeCounter));

  cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

  return cardElement;
}

export function handleLikeButton(cardId, likeButton, likeCounter) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
    (isLiked ? dislikeCard(cardId) : likeCard(cardId))
      .then((updatedCard) => {
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => console.error(`Ошибка обновления лайка: ${err}`));
  };

export function handleDeleteCard(cardId, cardElement) {
   deleteCard(cardId)
     .then(() => {
      cardElement.remove();
    })
     .catch((err) => console.error(`Ошибка удаления карточки: ${err}`));
}; 