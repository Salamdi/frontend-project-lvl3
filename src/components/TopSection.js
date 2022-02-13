import i18next from 'i18next';
import i18n, {
  READ_RSS_TODAY, RSS_AGGREGATOR, RSS_LINK, ADD, EXAMPLE,
} from '../i18n';

const headTitle = document.getElementById('head-title');
const headText = document.getElementById('head-text');
const rssInput = document.getElementById('rss-input');
const rssLabel = document.getElementById('rss-label');
const submitButton = document.getElementById('submit-button');
const example = document.getElementById('example');

i18n.then(() => {
  headTitle.innerHTML = i18next.t(RSS_AGGREGATOR);
  headText.innerHTML = i18next.t(READ_RSS_TODAY);
  rssInput.setAttribute('placeholder', i18next.t(RSS_LINK));
  rssLabel.innerHTML = i18next.t(RSS_LINK);
  submitButton.innerHTML = i18next.t(ADD);
  example.innerHTML = i18next.t(EXAMPLE);
});
