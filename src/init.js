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
  RSS_AGGREGATOR,
  READ_RSS_TODAY,
  RSS_LINK,
  ADD,
  EXAMPLE,
} from './i18n.js';
import schema from './schema.js';

export default (appState = {}) => {
  const initState = {
    error: null,
    successMessage: null,
    rssUrls: [],
    feeds: [],
    posts: [],
    rssForm: 'initial',
  };

  const modalElement = document.getElementById('modal');
  const modalTitleElement = document.getElementById('modal-title');
  const modalBodyElement = document.getElementById('modal-body');
  const modalLinkElement = document.getElementById('modal-link');
  const dismissButton = document.getElementById('dismiss-button');
  const rssForm = document.getElementById('rss-form');
  const headTitle = document.getElementById('head-title');
  const headText = document.getElementById('head-text');
  const rssInput = document.getElementById('rss-input');
  const rssLabel = document.getElementById('rss-label');
  const submitButton = document.getElementById('submit-button');
  const example = document.getElementById('example');

  i18nInstance.init()
    .then(() => {
      const render = makeRender();
      headTitle.innerHTML = i18nInstance.t(RSS_AGGREGATOR);
      headText.innerHTML = i18nInstance.t(READ_RSS_TODAY);
      rssInput.setAttribute('placeholder', i18nInstance.t(RSS_LINK));
      rssLabel.innerHTML = i18nInstance.t(RSS_LINK);
      submitButton.innerHTML = i18nInstance.t(ADD);
      example.innerHTML = i18nInstance.t(EXAMPLE);
      const state = onChange({ ...initState, ...appState }, render);
      startWorker(state);
      rssForm.addEventListener('submit', (event) => {
        event.preventDefault();
        state.rssForm = 'loading';
        const formData = new FormData(event.target);
        const url = formData.get('url');
        schema
          .validate([...state.rssUrls, url])
          .then(() => {
            state.error = null;
            state.successMessage = null;
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
            state.successMessage = i18nInstance.t(SUCCESS_MESSAGE);
            state.rssForm = 'success';
          })
          .catch((error) => {
            state.rssForm = 'fail';
            state.successMessage = null;
            if (error instanceof ValidationError) {
              state.error = i18nInstance.t(error.message.default);
              return;
            }
            if (error.request) {
              state.error = i18nInstance.t(NETWORK_ERROR);
              return;
            }
            if (error.invalidRss) {
              state.error = i18nInstance.t(INVALID_RSS);
              return;
            }
            state.error = i18nInstance.t(GENERIC_ERROR);
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
