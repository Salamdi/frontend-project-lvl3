import i18next from 'i18next';

export const URL_DUPLICATION = 'URL_DUPLICATION';
export const INVALID_URL = 'INVALID_URL';
export const INVALID_RSS = 'INVALID_RSS';
export const FEEDS_TITLE = 'FEEDS_TITLE';

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
      },
    },
    ru: {
      translation: {
        [URL_DUPLICATION]: 'RSS уже существует',
        [INVALID_URL]: 'Ссылка должна быть валидным URL',
        [INVALID_RSS]: 'Невалидный RSS',
        [FEEDS_TITLE]: 'Фиды',
      },
    },
  },
});
