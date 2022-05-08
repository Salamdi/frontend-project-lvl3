import axios from 'axios';

export default axios.create({
  baseURL: 'https://allorigins.hexlet.app/get',
  params: {
    disableCache: true,
  },
});
