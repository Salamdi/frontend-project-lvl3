import i18next from 'i18next';

export const URL_DUPLICATION = 'URL_DUPLICATION';
export const INVALID_URL = 'INVALID_URL';
export const INVALID_RSS = 'INVALID_RSS';
export const FEEDS_TITLE = 'FEEDS_TITLE';
export const POSTS_TITLE = 'POSTS_TITLE';
export const SHOW = 'SHOW';
export const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE';
export const GENERIC_ERROR = 'GENERIC_ERROR';

export default i18next.init({
  debug: true,
  lng: 'en',
  resources: {
    en: {
      translation: {
        [URL_DUPLICATION]: 'Your RSS list already has this url',
        [INVALID_URL]: 'URL is invalid',
        [INVALID_RSS]: 'Invalid RSS',
        [FEEDS_TITLE]: 'Feeds',
        [POSTS_TITLE]: 'Posts',
        [SHOW]: 'Show',
        [SUCCESS_MESSAGE]: 'RSS has been successfully downloded',
        [GENERIC_ERROR]: 'Something went wrong',
      },
    },
    ru: {
      translation: {
        [URL_DUPLICATION]: 'RSS уже существует',
        [INVALID_URL]: 'Ссылка должна быть валидным URL',
        [INVALID_RSS]: 'Невалидный RSS',
        [FEEDS_TITLE]: 'Фиды',
        [POSTS_TITLE]: 'Посты',
        [SHOW]: 'Просмотр',
        [SUCCESS_MESSAGE]: 'RSS успешно загружен',
        [GENERIC_ERROR]: 'Что-то пошло не так',
      },
    },
  },
});
