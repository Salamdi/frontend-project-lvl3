const errorMessageElement = document.getElementById('error-message');

const render = (value) => {
  if (value === null) {
    errorMessageElement.classList.add('d-none');
    return;
  }

  errorMessageElement.textContent = value;
  errorMessageElement.classList.remove('d-none');
};

export default (path, value) => {
  if (path === 'error') {
    render(value);
  }
};
