import 'bootstrap';
import './index.scss';
import onChange from 'on-change';
import { ValidationError } from 'yup';
import startWorker from './rssWorker.js';
import makeRender from './render.js';
import http from './http.js';
import parseXML from './parseXML.js';
import i18nInstance, {
  NETWORK_ERROR,
  GENERIC_ERROR,
  INVALID_RSS,
} from './i18n.js';
import schema from './schema.js';

export default (appState = {}) => {
  const initState = {
    error: null,
    rssUrls: [],
    feeds: [],
    posts: [],
    rssForm: 'initial',
    lng: 'en',
    postToShow: null,
  };

  const modalElement = document.getElementById('modal');
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
          .then(() => http.get('', { params: { url } }))
          .then(({ data }) => {
            const {
              title, description, id, posts,
            } = parseXML(data.contents);
            state.feeds.push({ title, description, id });
            state.posts = state.posts.concat(posts);
            state.rssUrls.push(url);
            state.rssForm = 'success';
          })
          .catch((error) => {
            state.rssForm = 'fail';
            if (error instanceof ValidationError) {
              state.error = error.message.default;
              return;
            }
            if (error.request) {
              state.error = NETWORK_ERROR;
              return;
            }
            if (error.invalidRss) {
              state.error = INVALID_RSS;
              return;
            }
            state.error = GENERIC_ERROR;
          });
      });

      modalElement.addEventListener('show.bs.modal', (event) => {
        const postId = event.relatedTarget.dataset.id;
        const postToShow = state.posts.find((post) => post.id === postId);
        state.postToShow = postToShow;
        const postIndex = state.posts.indexOf(postToShow);
        state.posts[postIndex] = { ...postToShow, visited: true };
      });
    });
};
