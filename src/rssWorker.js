import differenceBy from 'lodash/differenceBy.js';
import http from './http.js';
import parseXML from './parseXML.js';

const WORKER_TIMEOUT = 5000;

const getId = (post) => post.id;

export default (state) => {
  const runWorker = () => {
    setTimeout(() => {
      const promises = state.rssUrls.map((url) => http.get('', { params: { url } })
        .then((response) => {
          const { posts } = parseXML(response.data.contents);
          const freshPosts = differenceBy(posts, state.posts, getId);
          state.posts = state.posts.concat(freshPosts);
        })
        .catch(console.error));
      Promise.all(promises)
        .finally(runWorker);
    }, WORKER_TIMEOUT);
  };

  runWorker();
};
