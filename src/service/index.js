import {createApi} from "../util";

export const getArticleListApi = data => createApi("/api/articleList", data);
export const getArticleApi = data => createApi("/api/article?id=" + data.id);
export const evaluateArticleApi = data => createApi("/api/evaluate?id=" + data.id + "type=" + data.type);
export const getCategoriesApi = () => createApi("/api/categories");
