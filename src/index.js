import './index.scss';
import * as yup from 'yup';

const submitRss = (rss) => Promise.resolve(rss);

const rssForm = document.getElementById('rss-form');
const errorMessageElement = document.getElementById('error-message');

const schema = yup.array()
  .of(
    yup
      .string()
      .url('Link must be a valid URL'),
  )
  .test({
    test: (urls) => {
      const [lastUrl, ...previousUrls] = urls.reverse();
      return !previousUrls.includes(lastUrl);
    },
    name: 'unique',
    message: 'RSS already exists',
  });

const rssUrls = [];

rssForm.addEventListener('submit', (event) => {
  const formData = new FormData(event.target);
  const url = formData.get('url');
  schema
    .validate(rssUrls)
    .then(() => {
      if (!errorMessageElement.classList.contains('d-none')) {
        errorMessageElement.classList.add('d-none');
      }
      submitRss(url);
    })
    .then(rssUrls.push(url))
    .catch((error) => {
      errorMessageElement.textContent = error;
      errorMessageElement.classList.remove('d-none');
    });
  event.preventDefault();
});
