import * as yup from 'yup';

yup.setLocale({
  string: {
    url: {
      default: 'invalid_url',
    },
  },
  array: {
    unique: 'url_duplication',
  },
});

export default yup.array()
  .of(
    yup
      .string()
      .url(),
  )
  .test({
    test: (urls) => {
      const [lastUrl, ...previousUrls] = urls.reverse();
      return !previousUrls.includes(lastUrl);
    },
    name: 'unique',
  });
