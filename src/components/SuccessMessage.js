const successMessageElement = document.getElementById('success-message');

const render = (value) => {
  if (value === null) {
    successMessageElement.classList.add('d-none');
    return;
  }

  successMessageElement.textContent = value;
  successMessageElement.classList.remove('d-none');
};

export default (path, value) => {
  if (path !== 'successMessage') {
    return;
  }

  render(value);
};
