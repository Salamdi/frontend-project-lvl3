import onChange from 'on-change';
import { handleChange } from './subscribe';

const state = {
  error: null,
  rssList: [],
};

export default onChange(state, handleChange);
