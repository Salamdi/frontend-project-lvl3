import * as yup from 'yup';
import { INVALID_URL, URL_DUPLICATION } from './i18n';

yup.setLocale({
  string: {
    url: {
      default: INVALID_URL,
    },
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
    message: {
      default: URL_DUPLICATION,
    },
  });
