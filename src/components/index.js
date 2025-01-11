import '../pages/index.css';
import { createCard, handleDeleteCard, handleLikeButton } from './card.js';
import { closePopup, openPopup } from './modal.js';
import {enableValidation, clearValidation, validationConfig} from './validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, updateUserAvatar} from './api.js';

const container = document.querySelector('.page');
const addCardForm = container.querySelector('.popup__form');
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
const addCardPopup = container.querySelector('.popup_type_new-card');
const popupImage = container.querySelector('.popup_type_image');
const avatarPopup = container.querySelector('.popup_type_avatar-edit');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar-url');
const avatarButton = document.querySelector('.profile__image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

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

container.addEventListener('click', function (evt) {
    const clickedElement = evt.target;

    if (clickedElement.classList.contains('profile__edit-button')) {
        openPopup(popupEdit);
        clearValidation(popupEdit, validationConfig);
        nameInput.value = profileName.textContent; 
        jobInput.value = profileDescription.textContent;
    } else if (clickedElement.classList.contains('profile__add-button')) {
        openPopup(addCardPopup);
        clearValidation(addCardPopup, validationConfig);
        cardNameInput.value = "";
        cardLinkInput.value = "";
    } else if (clickedElement.classList.contains('profile__image')) {
        openPopup(avatarPopup);
        clearValidation(avatarPopup, validationConfig);
        avatarInput.value = "";
  }

    if (clickedElement.classList.contains('card__image')) {
        const cardElement = clickedElement.closest('.card');
        const imageSrc = clickedElement.src;
        const imageAlt = clickedElement.alt;
        const cardTitle = cardElement.querySelector('.card__title').textContent;
    }

});

enableValidation(validationConfig);

getUserInfo()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarButton.style.backgroundImage = `url(${userData.avatar})`; // Задаём аватар
  })
  .catch((err) => console.error(`Ошибка загрузки данных пользователя: ${err}`));

// updateUserAvatar(newAvatar)
// .then((userData) => {
//   console.log('Обновлённый пользователь:', userData); // Проверьте avatar
//   avatarButton.style.backgroundImage = `url(${userData.avatar})`;
//   closePopup(avatarPopup);
//   avatarForm.reset();
// })
// .catch((err) => console.error(`Ошибка обновления аватара: ${err}`));
