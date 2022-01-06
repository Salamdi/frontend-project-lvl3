import i18next from 'i18next';

export default i18next.init({
  debug: true,
  lng: 'en',
  resources: {
    en: {
      translation: {
        title: 'RSS Aggregator',
        url_duplication: 'Your RSS list already has this url',
        invalid_url: 'URL is invalid',
      },
    },
  },
});
