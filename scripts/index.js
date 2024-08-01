// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector('.page');
const cardList = container.querySelector('.places__list');

function addCard(cardName, cardLink) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').setAttribute('src', cardLink);
    cardElement.querySelector('.card__title').textContent = cardName;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    cardList.append(cardElement);
}

function deleteCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach((card) => {
    addCard(card.name, card.link);
});