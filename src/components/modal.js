export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popupElement.addEventListener('click', closePopupByClick);
}

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popupElement.removeEventListener('click', closePopupByClick);
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closePopup(openPopup);
        }
    }
}

function closePopupByClick(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closePopup(evt.currentTarget);
    }
}