import 'bootstrap';
import './index.scss';
import onChange from 'on-change';
import { ValidationError } from 'yup';
import startWorker from './rssWorker.js';
import makeRender from './render.js';
import http from './http.js';
import parseXML from './parseXML.js';
import i18nInstance, {
  SUCCESS_MESSAGE,
  NETWORK_ERROR,
  GENERIC_ERROR,
  INVALID_RSS,
  READ_ALL,
  CLOSE,
} from './i18n.js';
import schema from './schema.js';

export default (appState = {}) => {
  const initState = {
    message: null,
    rssUrls: [],
    feeds: [],
    posts: [],
    rssForm: 'initial',
    lng: 'ru',
  };

  const modalElement = document.getElementById('modal');
  const modalTitleElement = document.getElementById('modal-title');
  const modalBodyElement = document.getElementById('modal-body');
  const modalLinkElement = document.getElementById('modal-link');
  const dismissButton = document.getElementById('dismiss-button');
  const rssForm = document.getElementById('rss-form');

  i18nInstance.init({
    debug: process.env.NODE_ENV === 'development',
    lng: appState.lng ?? initState.lng,
  })
    .then(() => {
      const state = onChange({ ...initState, ...appState }, makeRender());
      i18nInstance.on('languageChanged', (lng) => {
        state.lng = lng;
      });
      startWorker(state);
      rssForm.addEventListener('submit', (event) => {
        event.preventDefault();
        state.rssForm = 'loading';
        const formData = new FormData(event.target);
        const url = formData.get('url');
        schema
          .validate([...state.rssUrls, url])
          .then(() => {
            state.message = null;
            state.message = null;
            return http.get('', { params: { url } });
          })
          .then(({ data }) => {
            if (data.status?.error) {
              const error = new Error();
              error.message = { default: INVALID_RSS };
              throw error;
            }
            const {
              title, description, id, posts,
            } = parseXML(data.contents);
            state.feeds.push({ title, description, id });
            state.posts = state.posts.concat(posts);
            state.rssUrls.push(url);
            state.message = SUCCESS_MESSAGE;
            state.rssForm = 'success';
          })
          .catch((error) => {
            state.rssForm = 'fail';
            state.message = null;
            if (error instanceof ValidationError) {
              state.message = error.message.default;
              return;
            }
            if (error.request) {
              state.message = NETWORK_ERROR;
              return;
            }
            if (error.invalidRss) {
              state.message = INVALID_RSS;
              return;
            }
            state.message = GENERIC_ERROR;
          });
      });

      modalLinkElement.innerHTML = i18nInstance.t(READ_ALL);
      dismissButton.innerHTML = i18nInstance.t(CLOSE);
      modalElement.addEventListener('show.bs.modal', (event) => {
        const postId = event.relatedTarget.dataset.id;
        const postToShow = state.posts.find((post) => post.id === postId);
        modalTitleElement.innerHTML = postToShow.title;
        modalBodyElement.innerHTML = postToShow.description;
        modalLinkElement.setAttribute('href', postToShow.link);
        const postIndex = state.posts.indexOf(postToShow);
        state.posts[postIndex] = { ...postToShow, visited: true };
      });
    });
};
