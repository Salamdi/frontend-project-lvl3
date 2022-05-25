import i18nInstance, {
  FEEDS_TITLE, POSTS_TITLE, SHOW, SUCCESS_MESSAGE,
} from './i18n.js';

const renderError = (error, errorElement) => {
  errorElement.textContent = error;
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
  const link = document.querySelector(`a[data-id=${post.id}`);
  if (post.visited) {
    link.classList.add('fw-normal', 'link-secondary');
    link.classList.remove('fw-bolD');
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
  successMessageElement,
  errorElement,
) => {
  switch (state) {
    case 'success':
      successMessageElement.classList.remove('d-none');
      rssInputElement.removeAttribute('readonly');
      submitElement.removeAttribute('disabled', false);
      rssInputElement.value = '';
      break;
    case 'loading':
      rssInputElement.setAttribute('readonly', true);
      submitElement.setAttribute('disabled', true);
      errorElement.classList.add('d-none');
      successMessageElement.classList.add('d-none');
      break;
    case 'fail':
      errorElement.classList.remove('d-none');
      rssInputElement.removeAttribute('readonly');
      submitElement.removeAttribute('disabled', false);
      break;
    default:
      break;
  }
};

export default () => {
  const errorMessageElement = document.getElementById('error-message');
  const feedsElement = document.getElementById('feeds');
  const postsElement = document.getElementById('posts');
  const rssInputElement = document.getElementById('rss-input');
  const submitElement = document.getElementById('submit-button');
  const successMessageElement = document.getElementById('success-message');

  successMessageElement.innerHTML = i18nInstance.t(SUCCESS_MESSAGE);

  return (path, value) => {
    switch (path) {
      case 'error': {
        renderError(value, errorMessageElement);
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
          successMessageElement,
          errorMessageElement,
        );
        break;
      }
      default:
        if (/posts\.\d+\.visited/.test(path)) {
          renderPostLink(value);
        }
        break;
    }
  };
};
