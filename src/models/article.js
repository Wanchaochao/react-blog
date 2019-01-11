import {getArticleApi, evaluateArticleApi, createCommentApi, getArticleCommentsApi} from '../service'
import marked from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    hljs.initHighlightingOnLoad()
    return hljs.highlightAuto(code).value
  },
})

export default {
  namespace: 'article',
  state: {
    content: '加载中...',
    comments: [],
    value: '',
  },
  effects: {
    * articleApi({payload}, {put, set, select}) {
      let ret = yield getArticleApi({id: payload.id})
      yield put({type: 'setArticle', payload: ret})
      let comments = yield getArticleCommentsApi({article_id: payload.id})
      yield put({type: 'setArticle', payload: {comments}})
    },
    * evaluateApi({payload}, {put}) {
      let ret = yield evaluateArticleApi({
        id: payload.id,
        type: payload.type,
        praise: payload.praise,
        index: payload.index,
      })
      yield put({type: 'updateEvaluate', payload: {...ret, index: payload.index}})
    },
    * commentApi({payload}, {put}) {
      console.log('commentApi', payload)
      let ret = yield createCommentApi(payload)
      yield put({type: 'updateComments', payload: ret})
    },

  },
  reducers: {
    setArticle(state, {payload}) {
      if (payload.content) {
        payload.content = marked(payload.content)
      }
      return {
        ...state,
        ...payload,
      }
    },
    updateEvaluate(state, {payload}) {
      state.comments[payload.index].praise_num = payload.praise_num
      state.comments[payload.index].against_num = payload.against_num
      return {
        ...state,
      }
    },
    updateComments(state, {payload}) {
      state.comments.unshift(payload)
      return {
        ...state,
      }
    },
  },
}
