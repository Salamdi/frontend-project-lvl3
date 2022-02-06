import onChange from 'on-change';
import { handleChange } from './subscribe';

const state = {
  error: null,
  rssUrls: [],
  feeds: [],
  posts: [],
};

export default onChange(state, handleChange);
