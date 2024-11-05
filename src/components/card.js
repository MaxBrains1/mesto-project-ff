const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, onDelete, onLike, onImageClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
  
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);
    cardElement.querySelector('.card__title').textContent = cardData.name;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => onDelete(cardElement));
  
    likeButton.addEventListener('click', () => onLike(likeButton));
  
    cardImage.addEventListener('click', () => {
        onImageClick(cardData.link, cardData.name, cardData.name);
    });
  
    return cardElement;
}
  
export function handleLikeButton(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  
export function handleDeleteCard(cardElement) {
    cardElement.remove();
  }
  