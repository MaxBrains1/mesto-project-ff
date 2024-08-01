// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const container = document.querySelector('.page');
const cardList = container.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, onDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').setAttribute('src', cardData.link);
    cardElement.querySelector('.card__image').setAttribute('alt', cardData.name);
    cardElement.querySelector('.card__title').textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => onDelete(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
    cardList.append(cardElement); // Можно использовать append или prepend
}

// Вывести все карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDeleteCard);
    renderCard(cardElement);
});