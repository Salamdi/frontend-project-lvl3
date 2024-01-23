import i18next from 'i18next';

export const URL_DUPLICATION = 'URL_DUPLICATION';
export const INVALID_URL = 'INVALID_URL';
export const INVALID_RSS = 'INVALID_RSS';
export const FEEDS_TITLE = 'FEEDS_TITLE';
export const POSTS_TITLE = 'POSTS_TITLE';
export const SHOW = 'SHOW';
export const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE';
export const GENERIC_ERROR = 'GENERIC_ERROR';
export const READ_ALL = 'READ_ALL';
export const CLOSE = 'CLOSE';
export const RSS_AGGREGATOR = 'RSS_AGGREGATOR';
export const READ_RSS_TODAY = 'READ_RSS_TODAY';
export const RSS_LINK = 'RSS_LINK';
export const EXAMPLE = 'EXAMPLE';
export const NETWORK_ERROR = 'NETWORK_ERROR';
export const ADD = 'ADD';

export default i18next.createInstance({
  debug: process.env.NODE_ENV === 'development',
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
        [READ_ALL]: 'Read All',
        [CLOSE]: 'Close',
        [RSS_AGGREGATOR]: 'RSS Aggregator',
        [READ_RSS_TODAY]: 'Start reading RSS today! It is easy, it is beautiful',
        [RSS_LINK]: 'RSS Link',
        [EXAMPLE]: 'Example: https://ru.hexlet.io/lessons.rss',
        [NETWORK_ERROR]: 'Network Error',
        [ADD]: 'Add',
      },
    },
    ru: {
      translation: {
        [URL_DUPLICATION]: 'RSS уже существует',
        [INVALID_URL]: 'Ссылка должна быть валидным URL',
        [INVALID_RSS]: 'Ресурс не содержит валидный RSS',
        [FEEDS_TITLE]: 'Фиды',
        [POSTS_TITLE]: 'Посты',
        [SHOW]: 'Просмотр',
        [SUCCESS_MESSAGE]: 'RSS успешно загружен',
        [GENERIC_ERROR]: 'Что-то пошло не так',
        [READ_ALL]: 'Читать полностью',
        [CLOSE]: 'Закрыть',
        [RSS_AGGREGATOR]: 'RSS агрегатор',
        [READ_RSS_TODAY]: 'Начните читать RSS сегодня! Это легко, это красиво.',
        [RSS_LINK]: 'Ссылка RSS',
        [EXAMPLE]: 'Пример: https://ru.hexlet.io/lessons.rss',
        [NETWORK_ERROR]: 'Ошибка сети',
        [ADD]: 'Добавить',
      },
    },
  },
});
