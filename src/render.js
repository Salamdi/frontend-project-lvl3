import head from 'lodash/head.js';
import i18nInstance, {
  ADD,
  EXAMPLE,
  FEEDS_TITLE,
  POSTS_TITLE,
  READ_ALL,
  READ_RSS_TODAY,
  RSS_AGGREGATOR,
  RSS_LINK,
  SHOW,
  CLOSE,
} from './i18n.js';

const setText = (node, text) => {
  if (node === null) {
    return;
  }
  if (node instanceof NodeList) {
    node.forEach((element) => {
      element.textContent = text;
    });
  }
  node.textContent = text;
};

const rerenderTexts = (prevLng) => {
  const messageElement = document.getElementById('message');
  if (messageElement) {
    const key = head(Object.entries(i18nInstance.store.data[prevLng]?.translation ?? {})
      .find(([, value]) => value === messageElement.textContent.trim()));
    messageElement.textContent = i18nInstance.t(key);
  }
  document.getElementById('rss-input').setAttribute('placeholder', i18nInstance.t(RSS_LINK));
  setText(document.getElementById('feeds')?.querySelector('.card-title'), i18nInstance.t(FEEDS_TITLE));
  setText(document.getElementById('posts')?.querySelector('.card-title'), i18nInstance.t(POSTS_TITLE));
  setText(document.getElementById('posts')?.querySelectorAll('button.btn'), i18nInstance.t(SHOW));
  setText(document.getElementById('submit-button'), i18nInstance.t(ADD));
  setText(document.getElementById('modal-link'), i18nInstance.t(READ_ALL));
  setText(document.getElementById('dismiss-button'), i18nInstance.t(CLOSE));
  setText(document.getElementById('head-title'), i18nInstance.t(RSS_AGGREGATOR));
  setText(document.getElementById('head-text'), i18nInstance.t(READ_RSS_TODAY));
  setText(document.getElementById('rss-label'), i18nInstance.t(RSS_LINK));
  setText(document.getElementById('example'), i18nInstance.t(EXAMPLE));
  setText(document.getElementById('modal-link'), i18nInstance.t(READ_ALL));
  setText(document.getElementById('dismiss-button'), i18nInstance.t(CLOSE));
};

const renderModalContent = (post) => {
  setText(document.getElementById('modal-title'), post.title);
  setText(document.getElementById('modal-body'), post.description);
  document.getElementById('modal-link').setAttribute('href', post.link);
};

const renderMessage = (message, messageElement) => {
  messageElement.textContent = i18nInstance.t(message);
};

const renderFeeds = (feedList, feedsElement) => {
  if (feedList.length) {
    const feedElements = feedList.map((feed) => `
      <li class="list-group-item border-0 border-end-0">
        <h3 class="h6 m-0">${feed.title}</h3>
        <p class="m-0 small text-black-50">
          ${feed.description}
        </p>
      </li>
    `).join('\n');
    const card = `
      <div class="card border-0">
        <div class="card-body">
          <h2 class="card-title h4">
            ${i18nInstance.t(FEEDS_TITLE)}
          </h2>
        </div>
        <ul class="list-group border-0 rounded-0">
          ${feedElements}
        </ul>
      </div>
    `;

    feedsElement.innerHTML = card;
  }
};

const renderPostLink = (post) => {
  const link = document.querySelector(`a[data-id="${post.id}"]`);
  if (post.visited) {
    link.classList.add('fw-normal', 'link-secondary');
    link.classList.remove('fw-bold');
  } else {
    link.classList.add('fw-bold');
    link.classList.remove('fw-normal', 'link-secondary');
  }
};

const renderPosts = (posts, postsElement) => {
  if (!posts.length) {
    return;
  }
  const postElements = posts.map((post) => `
    <li
      class="list-group-item
      d-flex
      justify-content-between
      align-items-start
      border-0 border-end-0"
      id="${post.id}"
    >
      <a
        href="${post.link}"
        class="${post.visited ? 'fw-normal link-secondary' : 'fw-bold'}"
        data-id="${post.id}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${post.title}
      </a>
      <button
        type="button"
        class="btn
        btn-outline-primary
        btn-sm"
        data-id="${post.id}"
        data-bs-toggle="modal"
        data-bs-target="#modal"
      >
        ${i18nInstance.t(SHOW)}
      </button>
    </li>
  `).join('\n');

  const card = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">
          ${i18nInstance.t(POSTS_TITLE)}
        </h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${postElements}
      </ul>
    </div>
  `;
  postsElement.innerHTML = card;
};

const renderRssForm = (
  state,
  rssInputElement,
  submitElement,
  messageElement,
) => {
  switch (state) {
    case 'success':
      messageElement.classList.remove('text-danger');
      messageElement.classList.add('text-success');
      messageElement.classList.remove('d-none');
      rssInputElement.removeAttribute('readonly');
      submitElement.removeAttribute('disabled', false);
      rssInputElement.value = '';
      break;
    case 'loading':
      rssInputElement.setAttribute('readonly', true);
      submitElement.setAttribute('disabled', true);
      messageElement.classList.add('d-none');
      break;
    case 'fail':
      messageElement.classList.remove('text-success');
      messageElement.classList.add('text-danger');
      messageElement.classList.remove('d-none');
      rssInputElement.removeAttribute('readonly');
      submitElement.removeAttribute('disabled', false);
      break;
    default:
      break;
  }
};

export default () => {
  const messageElement = document.getElementById('message');
  const feedsElement = document.getElementById('feeds');
  const postsElement = document.getElementById('posts');
  const rssInputElement = document.getElementById('rss-input');
  const submitElement = document.getElementById('submit-button');

  return (path, value, previousValue) => {
    switch (path) {
      case 'message': {
        renderMessage(value, messageElement);
        break;
      }
      case 'feeds': {
        renderFeeds(value, feedsElement);
        break;
      }
      case 'posts': {
        renderPosts(value, postsElement);
        break;
      }
      case 'rssForm': {
        renderRssForm(
          value,
          rssInputElement,
          submitElement,
          messageElement,
        );
        break;
      }
      case 'lng': {
        rerenderTexts(previousValue);
        break;
      }
      case 'postToShow': {
        renderModalContent(value);
        break;
      }
      default:
        if (/posts\.\d+/.test(path)) {
          renderPostLink(value);
        }
        break;
    }
  };
};
