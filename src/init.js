import 'bootstrap';
import './index.scss';
import onChange from 'on-change';
import initError from './components/Error.js';
import initSuccessMessage from './components/SuccessMessage.js';
import initFeeds from './components/Feeds.js';
import initPosts from './components/Posts.js';
import initSubmitButton from './components/SubmitButton.js';
import initRssInput from './components/rssInput.js';
import initRssForm from './components/RssForm.js';
import initModal from './components/Modal.js';
import initTopSection from './components/TopSection.js';
import startWorker from './rssWorker.js';
import { subscribe, handleChange } from './subscribe.js';
import i18nInstance from './i18n.js';

export default (appState = {}) => {
  const initState = {
    error: null,
    successMessage: null,
    rssUrls: [],
    feeds: [],
    posts: [],
    loading: false,
  };
  const state = onChange({ ...initState, ...appState }, handleChange);
  i18nInstance.init()
    .then(() => {
      subscribe(initError());
      subscribe(initFeeds());
      subscribe(initPosts(state));
      subscribe(initSubmitButton());
      subscribe(initSuccessMessage());
      subscribe(initRssInput());
      subscribe(startWorker(state));
      initRssForm(state);
      initModal(state);
      initTopSection();
    });
};
