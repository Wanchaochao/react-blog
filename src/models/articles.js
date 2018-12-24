import { articleListApi } from '../service'

export default {
  namespace: 'article',
  state: {
    list: [],
    page: {
      current: 1,
      pageSize: 10,
      total : 0
    }
  },
  effects: {
    * articleListApi ({payload},{put,set,select}) {
        const ret = yield articleListApi(payload)
        yield put({type: 'articleList', payload: ret})
    }
  },
  reducers: {
    articleList (state, {payload}) {
      return {
      ...state,
      ...payload
      }
    }
  }
}
