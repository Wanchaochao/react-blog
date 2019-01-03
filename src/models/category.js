import { getArticlesApi } from '../service';

export default {
  namespace: 'category',
  state: {
    list: [],
  },
  effects: {
    * getArticles({ payload }, { put, set, select }) {
      let ret = yield getArticlesApi(payload);
      yield put({ type: 'setArticles', payload: { list: ret } });
    },
  },
  reducers: {
    setArticles(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
