const submitElement = document.getElementById('submit-button');

const render = (disabled) => {
  if (disabled) {
    submitElement.setAttribute('disabled', disabled);
  } else {
    submitElement.removeAttribute('disabled');
  }
};

export default (path, value) => {
  if (path !== 'loading') {
    return;
  }

  render(value);
};
