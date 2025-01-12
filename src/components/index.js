import '../pages/index.css';
import { createCard, handleDeleteCard, handleLikeButton } from './card.js';
import { closePopup, openPopup } from './modal.js';
import {enableValidation, clearValidation, toggleButtonState} from './validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, updateUserAvatar} from './api.js';

const container = document.querySelector('.page');
const addCardPopup = container.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const editProfileForm = container.querySelector('.popup__form'); 
const nameInput = container.querySelector('.popup__input_type_name');
const jobInput = container.querySelector('.popup__input_type_description');
const cardNameInput = container.querySelector('.popup__input_type_card-name');
const cardLinkInput = container.querySelector('.popup__input_type_url');
const avatarLinkInput = container.querySelector('.popup__input_type_avatarUrl')
const cardList = container.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = container.querySelector('.popup_type_edit');
const popupImage = container.querySelector('.popup_type_image');
const avatarPopup = container.querySelector('.popup_type_avatar-edit');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar-url');
const avatarButton = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarButton.style.backgroundImage = `url(${userData.avatar})`; 


    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, userData._id, handleDeleteCard, handleLikeButton, openImagePopup);
      renderCard(cardElement);
    });
  })
  .catch((err) => console.error(`Ошибка загрузки данных: ${err}`));

function renderCard(cardElement, prepend = false) {
    if (prepend) {
        cardList.prepend(cardElement);
    } else {
        cardList.append(cardElement);
    }
}


function openImagePopup(src, alt, caption) {
    popupImageElement.src = src;
    popupImageElement.alt = alt;
    popupCaptionElement.textContent = caption;
    openPopup(popupImage);
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;
  
    const submitButton = editProfileForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    updateUserInfo(newName, newJob)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closePopup(popupEdit);
      })
      .catch((err) => console.error(`Ошибка обновления профиля: ${err}`
      ))
      .finally(() => {
        submitButton.textContent = 'Сохранить';});
};

popupEdit.addEventListener('submit', handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
    evt.preventDefault();
  
    const name = cardNameInput.value;
    const link = cardLinkInput.value;
  
    const submitButton = addCardForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    addCard(name, link)
      .then((newCard) => {
        const cardElement = createCard(newCard, newCard.owner._id, handleDeleteCard, handleLikeButton, openImagePopup);
        renderCard(cardElement, true);
        closePopup(addCardPopup);
        addCardForm.reset();
      })
      .catch((err) => console.error(`Ошибка добавления карточки: ${err}`
      ))
      .finally(() => {
        submitButton.textContent = 'Сохранить';});
  };

addCardPopup.addEventListener('submit', handleAddCardSubmit);

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const newAvatar = avatarInput.value;

  const submitButton = avatarForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  updateUserAvatar(newAvatar)
    .then((userData) => {
      avatarButton.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
      avatarForm.reset(); 
    })
    .catch((err) => {
      console.error(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить'; 
    });
  };

avatarPopup.addEventListener('submit', handleAvatarSubmit);

profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  clearValidation(popupEdit, validationConfig);
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;

  const inputList = Array.from(popupEdit.querySelectorAll(validationConfig.inputSelector));
  const submitButton = popupEdit.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, submitButton, validationConfig);
});

profileAddButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  clearValidation(addCardPopup, validationConfig);
  cardNameInput.value = ""; 
  cardLinkInput.value = "";

  const inputList = Array.from(addCardPopup.querySelectorAll(validationConfig.inputSelector));
  const submitButton = addCardPopup.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, submitButton, validationConfig);
});

avatarButton.addEventListener('click', () => {
  openPopup(avatarPopup);
  clearValidation(avatarPopup, validationConfig);
  avatarInput.value = ""; 

  const inputList = Array.from(avatarPopup.querySelectorAll(validationConfig.inputSelector));
  const submitButton = avatarPopup.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, submitButton, validationConfig);
});

enableValidation(validationConfig);




