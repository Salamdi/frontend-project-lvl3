const rssInputElement = document.getElementById('rss-input');

const render = (successMessage) => {
  if (successMessage === null) {
    return;
  }

  rssInputElement.value = '';
};

export default (path, value) => {
  if (path !== 'successMessage') {
    return;
  }

  render(value);
};
