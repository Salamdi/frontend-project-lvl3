import i18n from 'i18next';
import { POSTS_TITLE, SHOW } from '../i18n';

const postsElement = document.getElementById('posts');

const render = (posts) => {
  if (!posts.length) {
    return;
  }
  const postElements = posts.map((post) => `
    <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
      <a href="${post.link}" class="fw-bold" data-id="6" target="_blank" rel="noopener noreferrer">
        ${post.title}
      </a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="6" data-bs-toggle="modal" data-bs-target="#modal">
        ${i18n.t(SHOW)}
      </button>
    </li>
  `).join('\n');

  const card = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">
          ${i18n.t(POSTS_TITLE)}
        </h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${postElements}
      </ul>
    </div>
  `;

  postsElement.innerHTML = card;
};

export default (path, value) => {
  if (path !== 'posts') {
    return;
  }

  render(value);
};
