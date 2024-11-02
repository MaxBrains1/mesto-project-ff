const container = document.querySelector('.page');
export const popupEdit = container.querySelector('.popup_type_edit');
export const popupImage = container.querySelector('.popup_type_image');
export const addCardPopup = container.querySelector('.popup_type_new-card');
export const editCardForm = document.querySelector('.popup__form'); 
export const nameInput = editCardForm.querySelector('.popup__input_type_name');
export const jobInput = editCardForm.querySelector('.popup__input_type_description');
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

export function openImagePopup(src, alt, caption) {
    popupImageElement.src = src;
    popupImageElement.alt = alt;
    popupCaptionElement.textContent = caption;
    togglePopup(popupImage, 'add');
}

export function togglePopup(popupElement, action) {
    popupElement.classList[action]('popup_is-opened');
}

container.addEventListener('click', function (evt) {
    const clickedElement = evt.target;

    if (clickedElement.classList.contains('profile__edit-button')) {
        togglePopup(popupEdit, 'add');
        nameInput.value = profileName.textContent; 
        jobInput.value = profileDescription.textContent;
    } else if (clickedElement.classList.contains('profile__add-button')) {
        togglePopup(addCardPopup, 'add');
    }

    if (clickedElement.classList.contains('popup__close') || clickedElement.classList.contains('popup')) {
        togglePopup(popupEdit, 'remove');
        togglePopup(addCardPopup, 'remove');
        togglePopup(popupImage, 'remove');
    }

    if (clickedElement.classList.contains('card__image')) {
        const cardElement = clickedElement.closest('.card');
        const imageSrc = clickedElement.src;
        const imageAlt = clickedElement.alt;
        const cardTitle = cardElement.querySelector('.card__title').textContent;

        openImagePopup(imageSrc, imageAlt, cardTitle);
    }

});

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        togglePopup(popupEdit, 'remove');
        togglePopup(addCardPopup, 'remove');
        togglePopup(popupImage, 'remove');
    }
});