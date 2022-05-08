export default () => {
  const rssInputElement = document.getElementById('rss-input');

  const render = (successMessage) => {
    if (successMessage === null) {
      return;
    }

    rssInputElement.value = '';
  };

  return (path, value) => {
    if (path !== 'successMessage') {
      return;
    }

    render(value);
  };
};
