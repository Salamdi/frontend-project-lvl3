import { INVALID_RSS } from './i18n.js';

export default (data) => {
  const domParser = new DOMParser();
  const xmlDocument = domParser.parseFromString(data, 'application/xml');
  if (!xmlDocument.documentElement) {
    const error = new Error();
    error.message = { default: INVALID_RSS };
    throw error;
  }
  const title = xmlDocument.querySelector('channel title');
  const description = xmlDocument.querySelector('channel description');
  if (!title || !description) {
    const error = new Error();
    error.invalidRss = true;
    throw error;
  }
  const link = xmlDocument.querySelector('link');
  const items = xmlDocument.querySelectorAll('channel item');
  const posts = Array.from(items)
    .map((item) => ({
      id: item.querySelector('guid')?.textContent ?? item.querySelector('title').textContent,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
      pubDate: item.querySelector('pubDate').textContent,
    }));

  return {
    title: title.textContent,
    description: description.textContent,
    id: link.textContent,
    posts,
  };
};
