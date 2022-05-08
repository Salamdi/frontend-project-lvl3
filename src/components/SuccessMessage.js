export default () => {
  const successMessageElement = document.getElementById('success-message');

  const render = (value) => {
    if (value === null) {
      successMessageElement.classList.add('d-none');
      return;
    }

    successMessageElement.textContent = value;
    successMessageElement.classList.remove('d-none');
  };

  return (path, value) => {
    if (path !== 'successMessage') {
      return;
    }

    render(value);
  };
};
