import i18nInstance, { POSTS_TITLE, SHOW } from '../i18n';
import state from '../state';

export default () => {
  const postsElement = document.getElementById('posts');

  const render = (posts) => {
    if (!posts.length) {
      return;
    }
    const postElements = posts.map((post) => `
    <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
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

  return (path, value) => {
    if (path === 'posts') {
      render(value);
    }
    if (/posts\.\d+\.visited/.test(path)) {
      render(state.posts);
    }
  };
};
