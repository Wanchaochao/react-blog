import { getCategoriesApi } from '../service';

export default {
  namespace: 'category',
  state: {
    list: [],
  },
  effects: {
    * getCategories({payload}, { put }) {
      console.log(2222)
      const ret = yield getCategoriesApi();
      yield put({ type: 'setCategories', payload: ret });
    },
  },
  reducers: {
    setCategories(state, { payload }) {
      return {
        ...state,
        list: payload.data,
      };
    },
  },
};
