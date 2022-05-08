import i18nInstance, {
  READ_RSS_TODAY, RSS_AGGREGATOR, RSS_LINK, ADD, EXAMPLE,
} from '../i18n';

export default () => {
  const headTitle = document.getElementById('head-title');
  const headText = document.getElementById('head-text');
  const rssInput = document.getElementById('rss-input');
  const rssLabel = document.getElementById('rss-label');
  const submitButton = document.getElementById('submit-button');
  const example = document.getElementById('example');

  headTitle.innerHTML = i18nInstance.t(RSS_AGGREGATOR);
  headText.innerHTML = i18nInstance.t(READ_RSS_TODAY);
  rssInput.setAttribute('placeholder', i18nInstance.t(RSS_LINK));
  rssLabel.innerHTML = i18nInstance.t(RSS_LINK);
  submitButton.innerHTML = i18nInstance.t(ADD);
  example.innerHTML = i18nInstance.t(EXAMPLE);
};
