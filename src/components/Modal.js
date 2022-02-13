import i18next from 'i18next';
import i18n, { CLOSE, READ_ALL } from '../i18n';
import state from '../state';

const modalElement = document.getElementById('modal');
const modalTitleElement = document.getElementById('modal-title');
const modalBodyElement = document.getElementById('modal-body');
const modalLinkElement = document.getElementById('modal-link');
const dismissButton = document.getElementById('dismiss-button');

i18n.then(() => {
  modalLinkElement.innerHTML = i18next.t(READ_ALL);
  dismissButton.innerHTML = i18next.t(CLOSE);
});

modalElement.addEventListener('show.bs.modal', (event) => {
  const postId = event.relatedTarget.dataset.id;
  const postToShow = state.posts.find((post) => post.id === postId);
  modalTitleElement.innerHTML = postToShow.title;
  modalBodyElement.innerHTML = postToShow.description;
  modalLinkElement.setAttribute('href', postToShow.link);
  postToShow.visited = true;
});
