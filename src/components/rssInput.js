export default () => {
  const rssInputElement = document.getElementById('rss-input');

  const renderMessage = (successMessage) => {
    if (successMessage === null) {
      return;
    }

    rssInputElement.value = '';
  };

  const renderInput = (disabled) => {
    if (disabled) {
      rssInputElement.setAttribute('readonly', disabled);
    } else {
      rssInputElement.removeAttribute('readonly');
      rssInputElement.focus();
    }
  };

  return (path, value) => {
    switch (path) {
      case 'successMessage':
        renderMessage(value);
        break;
      case 'loading':
        renderInput(value);
        break;
      default:
        break;
    }
  };
};
