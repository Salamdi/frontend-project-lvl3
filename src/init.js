import 'bootstrap';
import './index.scss';
import initError from './components/Error';
import initSuccessMessage from './components/SuccessMessage';
import initFeeds from './components/Feeds';
import initPosts from './components/Posts';
import initSubmitButton from './components/SubmitButton';
import initRssInput from './components/RssInput';
import initRssForm from './components/RssForm';
import initModal from './components/Modal';
import initTopSection from './components/TopSection';
import startWorker from './rssWorker';
import { subscribe } from './subscribe';
import i18nInstance from './i18n';

export default () => {
  i18nInstance.init()
    .then(() => {
      subscribe(initError());
      subscribe(initFeeds());
      subscribe(initPosts());
      subscribe(initSubmitButton());
      subscribe(initSuccessMessage());
      subscribe(initRssInput());
      subscribe(startWorker());
      initRssForm();
      initModal();
      initTopSection();
    });
};
