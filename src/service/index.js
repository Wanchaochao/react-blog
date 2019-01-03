import { createApi } from '../util';

export const getArticleListApi = data => createApi('/api/articleList', data);
export const getArticleApi = data => createApi('/api/article?id=' + data.id);
export const evaluateArticleApi = data => createApi('/api/evaluate?id=' + data.id + 'type=' + data.type);
export const createCommentApi = data => createApi('/api/createComment', data, 'POST');
export const getArticlesApi = data => createApi('/api/getArticles', data, 'POST');
export const getCategoriesApi = () => createApi('/api/categories');
