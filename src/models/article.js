import { getArticleApi } from '../service'

export default {
  namespace: 'article',
  state: {
    article : {}
  },
  effects: {
    * articleApi ({payload},{put,set,select}) {
      const ret = yield getArticleApi({id: payload.id})
      yield put({type: 'article', payload: ret})
    },
  },
  reducers: {
    article (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
  }
}
