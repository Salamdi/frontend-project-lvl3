import './index.scss';
import i18n from 'i18next';
import schema from './schema';
import state from './state';
import renderError from './components/Error';
import renderFeeds from './components/Feeds';
import { subscribe } from './subscribe';
import i18nPromise, { INVALID_RSS } from './i18n';
import http from './http';

i18nPromise
  .then(() => console.log('initialized...'))
  .catch(console.log);

subscribe(renderError);
subscribe(renderFeeds);

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
    })
    .then(() => http.get('url', { params: { url } }))
    .then((response) => response.data)
    .then((data) => {
      if (data.status.error) {
        const error = new Error();
        error.message = { default: INVALID_RSS };
        throw error;
      }
      return data;
    })
    .then((data) => {
      const domParser = new DOMParser();
      const xmlDocument = domParser.parseFromString(data.contents, 'application/xml');
      if (!xmlDocument.documentElement) {
        const error = new Error();
        error.message = { default: INVALID_RSS };
        throw error;
      }
      const title = xmlDocument.querySelector('channel title');
      const description = xmlDocument.querySelector('channel description');
      if (!title || !description) {
        const error = new Error();
        error.message = { default: INVALID_RSS };
        throw error;
      }
      const items = xmlDocument.querySelectorAll('channel item');
      const posts = Array.from(items)
        .map((item) => ({
          id: item.querySelector('guid').textContent,
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          link: item.querySelector('link').textContent,
          pubDate: item.querySelector('pubDate').textContent,
        }));
      return { title: title.textContent, description: description.textContent, posts };
    })
    .then(({ title, description, posts }) => {
      state.feeds.push({ title, description });
      return posts;
    })
    .then((posts) => {
      state.posts.concat(posts);
    })
    .then(() => state.rssList.push(url))
    .catch((error) => {
      state.error = i18n.t(error.message.default);
    });
  event.preventDefault();
});
