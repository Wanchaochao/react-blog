import { getArticleApi, evaluateArticleApi, createCommentApi, getArticleCommentsApi } from '../service';

export default {
  namespace: 'article',
  state: {
    content: '加载中...',
    comments: [],
    submitting: false,
    value: '',
  },
  effects: {
    * articleApi({ payload }, { put, set, select }) {
      let ret = yield getArticleApi({ id: payload.id });
      yield put({ type: 'setArticle', payload: ret });
      let comments = yield getArticleCommentsApi({ article_id: payload.id });
      yield put({ type: 'setArticle', payload: { comments } });
    },
    * evaluateApi({ payload }, { put }) {
      let ret = yield evaluateArticleApi({ id: payload.id, type: payload.type, praise: payload.praise, index: payload.index });
      yield put({ type: 'updateEvaluate', payload: ret });
    },
    * commentApi({ payload }, { put }) {
      let ret = yield createCommentApi({
        article_id: payload.article_id,
        content: payload.content,
        nickname: payload.nickname,
      });
      yield put({ type: 'updateComments', payload: ret });
    },

  },
  reducers: {
    setArticle(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateEvaluate(state, { payload }) {
      state.comments[payload.index].like = payload.praise_num;
      state.comments[payload.index].dislike = payload.against_num;
      return {
        ...state,
      };
    },
    updateComments(state, { payload }) {
      state.comments.unshift(payload);
      return {
        ...state,
      };
    },
  },
};
