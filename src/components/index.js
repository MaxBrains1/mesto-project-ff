import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, handleLikeButton } from './card.js';
import { closePopup, openPopup } from './modal.js';

const container = document.querySelector('.page');
const addCardForm = container.querySelector('.popup__form');
const editCardForm = container.querySelector('.popup__form'); 
const nameInput = container.querySelector('.popup__input_type_name');
const jobInput = container.querySelector('.popup__input_type_description');
const cardNameInput = container.querySelector('.popup__input_type_card-name');
const cardLinkInput = container.querySelector('.popup__input_type_url');
const cardList = container.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = container.querySelector('.popup_type_edit');
const popupImage = container.querySelector('.popup_type_image');
const addCardPopup = container.querySelector('.popup_type_new-card');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

function renderCard(cardElement, prepend = false) {
    if (prepend) {
        cardList.prepend(cardElement);
    } else {
        cardList.append(cardElement);
    }
}

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDeleteCard, handleLikeButton, openImagePopup);
    renderCard(cardElement);
});

function openImagePopup(src, alt, caption) {
    popupImageElement.src = src;
    popupImageElement.alt = alt;
    popupCaptionElement.textContent = caption;
    openPopup(popupImage);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const newName = nameInput.value;
    const newJob = jobInput.value;

    profileName.textContent = newName;
    profileDescription.textContent = newJob;

    closePopup(popupEdit);
}

popupEdit.addEventListener('submit', handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const name = cardNameInput.value;
    const link = cardLinkInput.value;

    const newCard = createCard({ name, link }, handleDeleteCard, handleLikeButton,  openImagePopup );
    renderCard(newCard, true);

    closePopup(addCardPopup);
    addCardForm.reset();
}

addCardPopup.addEventListener('submit', handleAddCardSubmit);

container.addEventListener('click', function (evt) {
    const clickedElement = evt.target;

    if (clickedElement.classList.contains('profile__edit-button')) {
        openPopup(popupEdit);
        nameInput.value = profileName.textContent; 
        jobInput.value = profileDescription.textContent;
    } else if (clickedElement.classList.contains('profile__add-button')) {
        openPopup(addCardPopup);
    }

    if (clickedElement.classList.contains('card__image')) {
        const cardElement = clickedElement.closest('.card');
        const imageSrc = clickedElement.src;
        const imageAlt = clickedElement.alt;
        const cardTitle = cardElement.querySelector('.card__title').textContent;

        openImagePopup(imageSrc, imageAlt, cardTitle);
    }

});

