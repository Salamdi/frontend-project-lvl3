import differenceBy from 'lodash/differenceBy';
import http from './http';
import parseXML from './parseXML';
import state from './state';

export default () => {
  const WORKER_TIMEOUT = 5000;

  const runWorker = () => {
    state.rssUrls.forEach((url) => {
      http.get('', { params: { url } })
        .then((response) => response.data.contents)
        .then(parseXML)
        .then(({ posts }) => differenceBy(posts, state.posts, 'id'))
        .then((freshPosts) => {
          state.posts = state.posts.concat(freshPosts);
        })
        .catch(console.error);
    });

    setTimeout(runWorker, WORKER_TIMEOUT);
  };

  return (path, _, previousValue) => {
    if (path !== 'rssUrls') {
      return;
    }
    if (previousValue.length !== 0) {
      return;
    }
    runWorker();
  };
};
