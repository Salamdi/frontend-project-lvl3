import http from '../http.js';
import parseXML from '../parseXML.js';
import i18nInstance, {
  SUCCESS_MESSAGE, NETWORK_ERROR, GENERIC_ERROR, INVALID_RSS,
} from '../i18n.js';
import schema from '../schema.js';

export default (state) => {
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
        if (data.status?.error) {
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
        state.successMessage = i18nInstance.t(SUCCESS_MESSAGE);
        state.loading = false;
      })
      .catch((error) => {
        state.loading = false;
        state.successMessage = null;
        if (error.message === 'Network Error') {
          state.error = i18nInstance.t(NETWORK_ERROR);
          return;
        }
        if (!error.message?.default) {
          state.error = i18nInstance.t(GENERIC_ERROR);
          return;
        }
        state.error = i18nInstance.t(error.message.default);
      });
  });
};
