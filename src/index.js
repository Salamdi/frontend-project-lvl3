import './index.scss';

const rssForm = document.getElementById('rss-form');
rssForm.addEventListener('submit', (event) => {
  console.log('Submit');
  event.preventDefault();
});
