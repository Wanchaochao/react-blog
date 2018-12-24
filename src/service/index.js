import {createApi} from "../util";

export const articleListApi = data => createApi("/api/articleList", data);
export const listApi = data => createApi("/api/admin/list", data);
export const getCategoriesApi = data => createApi("/api/categories", data);
export const deleteApi = data => createApi("/api/admin/delete", data);
export const userApi = () => createApi("/api/admin/user");
