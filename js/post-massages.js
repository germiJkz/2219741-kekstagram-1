const MESSAGE_Z_POSITION = 100;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);

const checkElementTarget = (evt, button, inner) => evt.target.classList.contains(button) || !evt.target.classList.contains(inner);
const uploadingOverlay = document.querySelector('.img-upload__overlay');
const uploadingControl = document.querySelector('#upload-file');
const uploadingComments = uploadingOverlay.querySelector('.text__description');
const uploadingButton = uploadingOverlay.querySelector('#upload-submit');

const closeMessage = (message = successMessage) => {
  message.classList.add('hidden');
};

function onDocumentEscKeydown(evt) {
  if (evt.key === 'Escape') {
    uploadingOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    uploadingControl.value = '';

    uploadingComments.value = '';

    closeMessage();

    uploadingButton.disabled = false;
  }
  document.removeEventListener('keydown', onDocumentEscKeydown);
  successMessage.removeEventListener('click', onSuccessClick);
}

function onSuccessClick(evt) {
  if (checkElementTarget(evt, 'success__button', 'success__inner')) {
    uploadingOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    uploadingControl.value = '';

    uploadingComments.value = '';

    closeMessage();

    uploadingButton.disabled = false;
  }
  document.removeEventListener('keydown', onDocumentEscKeydown);
  successMessage.removeEventListener('click', onSuccessClick);
}

const closeErrorMessage = () => {
  closeMessage(errorMessage);

  document.addEventListener('keydown', onDocumentEscKeydown);
};

const onErrorEscapeDown = (evt) => {
  if(evt.key === 'Escape') {
    document.removeEventListener('keydown', onErrorEscapeDown);

    closeErrorMessage();
  }
};

const onErrorClick = (evt) => {
  if(checkElementTarget(evt, 'error__button', 'error__inner')) {
    document.removeEventListener('keydown', onErrorEscapeDown);

    closeErrorMessage();
  }
};

const appendMessage = (message) => {
  message.classList.add('hidden');
  message.style.zIndex = MESSAGE_Z_POSITION;

  document.body.appendChild(message);
};

const addPostMessages = () => {
  appendMessage(successMessage);
  appendMessage(errorMessage);
};

const showSuccessMessage = () => {
  successMessage.classList.remove('hidden');

  successMessage.addEventListener('click', onSuccessClick);

  document.addEventListener('keydown', onDocumentEscKeydown);
};

const showErrorMessage = () => {
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('keydown', onErrorEscapeDown);

  errorMessage.classList.remove('hidden');

  errorMessage.addEventListener('click', onErrorClick, {once: true});
};

export{addPostMessages, showSuccessMessage, closeMessage, showErrorMessage};
