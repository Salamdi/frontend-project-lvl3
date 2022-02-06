import './index.scss';
import i18n from 'i18next';
import schema from './schema';
import state from './state';
import renderError from './components/Error';
import renderSuccessMessage from './components/SuccessMessage';
import renderFeeds from './components/Feeds';
import renderPosts from './components/Posts';
import renderSubmitButton from './components/SubmitButton';
import { subscribe } from './subscribe';
import i18nPromise, { INVALID_RSS, SUCCESS_MESSAGE, GENERIC_ERROR } from './i18n';
import http from './http';
import parseXML from './parseXML';

i18nPromise
  .then(() => console.log('initialized...'))
  .catch(console.log);

subscribe(renderError);
subscribe(renderFeeds);
subscribe(renderPosts);
subscribe(renderSubmitButton);
subscribe(renderSuccessMessage);

const rssForm = document.getElementById('rss-form');

rssForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url');
  schema
    .validate([...state.rssUrls, url])
    .then(() => {
      state.error = null;
      state.successMessage = null;
      state.loading = true;
      return http.get('', { params: { url } });
    })
    .then((response) => response.data)
    .then((data) => {
      if (data.status.error) {
        const error = new Error();
        error.message = { default: INVALID_RSS };
        throw error;
      }
      return data.contents;
    })
    .then(parseXML)
    .then(({
      title,
      description,
      id,
      posts,
    }) => {
      state.feeds.push({ title, description, id });
      state.posts = state.posts.concat(posts);
      state.rssUrls.push(url);
      state.successMessage = i18n.t(SUCCESS_MESSAGE);
    })
    .catch((error) => {
      if (!error.message?.default) {
        state.error = i18n.t(GENERIC_ERROR);
      }
      state.successMessage = null;
      state.error = i18n.t(error.message.default);
    })
    .finally(() => {
      state.loading = false;
    });
});
