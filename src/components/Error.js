export default () => {
  const errorMessageElement = document.getElementById('error-message');

  const render = (value) => {
    if (value === null) {
      errorMessageElement.classList.add('d-none');
      return;
    }

    errorMessageElement.textContent = value;
    errorMessageElement.classList.remove('d-none');
  };

  return (path, value) => {
    if (path !== 'error') {
      return;
    }

    render(value);
  };
};
