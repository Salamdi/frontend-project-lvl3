import onChange from 'on-change';
import { handleChange } from './subscribe';

const state = {
  error: null,
  successMessage: null,
  rssUrls: [],
  feeds: [],
  posts: [],
  loading: false,
};

export default onChange(state, handleChange);
