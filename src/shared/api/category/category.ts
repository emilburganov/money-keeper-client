import {apiInstance} from "../base";
import {MessageResponse} from "../types";
import {CategoriesStats, CategoriesStatsBody, Category, CategoryBody} from "./models";

const BASE_URL = "/categories";

export const getCategories = (): Promise<Category[]> => {
    return apiInstance.get(BASE_URL);
};

export const getIncomeCategoriesStats = (body: CategoriesStatsBody|null = null): Promise<CategoriesStats> => {
    return apiInstance.get(`${BASE_URL}/income-stats`, {
        params: body
    });
};

export const getExpenseCategoriesStats = (body: CategoriesStatsBody | null = null): Promise<CategoriesStats> => {
    return apiInstance.get(`${BASE_URL}/expense-stats`, {
        params: body
    });
};

export const createCategory = (body: CategoryBody): Promise<Category> => {
    return apiInstance.post(`${BASE_URL}`, body);
};

export const updateCategory = (
    body: Omit<CategoryBody, "type">,
    id: number,
): Promise<Category> => {
    return apiInstance.patch(`${BASE_URL}/${id}`, body);
};

export const deleteCategory = (id: number): Promise<MessageResponse> => {
    return apiInstance.delete(`${BASE_URL}/${id}`);
};
