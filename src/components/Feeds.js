import i18nInstance, { FEEDS_TITLE } from '../i18n';

export default () => {
  const feeds = document.getElementById('feeds');

  const render = (feedList) => {
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

      feeds.innerHTML = card;
    }
  };

  return (path, value) => {
    if (path === 'feeds') {
      render(value);
    }
  };
};
