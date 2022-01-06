import './index.scss';
import i18n from 'i18next';
import schema from './schema';
import state from './state';
import renderError from './components/Error';
import { subscribe } from './subscribe';
import i18nPromise from './i18n';

i18nPromise
  .then(() => console.log('initialized...'))
  .catch(console.log);

subscribe(renderError);

const submitRss = (rss) => Promise.resolve(rss);

const rssForm = document.getElementById('rss-form');

rssForm.addEventListener('submit', (event) => {
  const formData = new FormData(event.target);
  const url = formData.get('url');
  schema
    .validate([...state.rssList, url])
    .then(() => submitRss(url))
    .then(() => {
      state.error = null;
      return url;
    })
    .then(state.rssList.push)
    .catch((error) => {
      state.error = i18n.t(error.message.default);
    });
  event.preventDefault();
});
