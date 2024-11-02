import '../pages/index.css';
import { initialCards, createCard, handleDeleteCard, handleLikeButton } from './cards.js';
import { togglePopup, popupEdit, addCardPopup, editCardForm, nameInput, jobInput, profileName, profileDescription} from './modal.js';

const container = document.querySelector('.page');
const cardList = container.querySelector('.places__list');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

function renderCard(cardElement, prepend = false) {
    if (prepend) {
        cardList.prepend(cardElement);
    } else {
        cardList.append(cardElement);
    }
}

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDeleteCard, handleLikeButton);
    renderCard(cardElement);
});

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const newName = nameInput.value;
    const newJob = jobInput.value;

    profileName.textContent = newName;
    profileDescription.textContent = newJob;

    togglePopup(popupEdit, 'remove');
}

editCardForm.addEventListener('submit', handleFormSubmit);

function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const name = cardNameInput.value;
    const link = cardLinkInput.value;

    const newCard = createCard({ name, link }, handleDeleteCard);
    renderCard(newCard, true);

    togglePopup(addCardPopup, 'remove');
    addCardForm.reset();
}

addCardForm.addEventListener('submit', handleAddCardSubmit);