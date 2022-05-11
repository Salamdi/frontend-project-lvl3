import differenceBy from 'lodash/differenceBy.js';
import http from './http.js';
import parseXML from './parseXML.js';

export default (state) => {
  const WORKER_TIMEOUT = 5000;

  const runWorker = () => {
    setTimeout(() => {
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
      runWorker();
    }, WORKER_TIMEOUT);
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
