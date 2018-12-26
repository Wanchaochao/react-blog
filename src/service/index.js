import {createApi} from "../util";

export const getArticleListApi = data => createApi("/api/articleList", data);
export const getArticleApi = data => createApi("/api/article?id=" + data.id);
export const getCategoriesApi = data => createApi("/api/categories", data);
