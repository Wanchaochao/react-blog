import {createApi} from '../util'

export const getArticleListApi = data => createApi('/api/articleList', data, 'POST')
export const getArticleApi = data => createApi('/api/article?id=' + data.id)
export const getArticleCommentsApi = data => createApi('/api/comments?article_id=' + data.article_id)
export const evaluateArticleApi = data => createApi('/api/evaluate?id=' + data.id + '&type=' + data.type + '&praise=' + data.praise)
export const createCommentApi = data => createApi('/api/createComment', data, 'POST')
export const getArticlesApi = data => createApi('/api/articles', data, 'POST')
export const getCategoriesApi = () => createApi('/api/categories')
