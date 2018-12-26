import { getCategoriesApi } from '../service';

export default {
  namespace: 'category',
  state: {
    list: [],
  },
  effects: {
    * getCategories({payload}, { put }) {
      const list = yield getCategoriesApi();
      yield put({ type: 'setCategories', payload: {list} });
    },
  },
  reducers: {
    setCategories(state, { payload }) {
      console.log({
        ...state,
        ...payload,
      })
      return {
        ...state,
        ...payload,
      };
    },
  },
};
