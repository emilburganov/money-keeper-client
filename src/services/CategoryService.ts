import {ICategory} from "@/models/ICategory";
import {IUser} from "@/models/IUser";
import {MessageResponse} from "@/models/Response/MessageResponse";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class CategoryService {
    static async index(user: IUser): Promise<AxiosResponse<ICategory[]>> {
        return $api.get<ICategory[]>(`categories/${user.id}`);
    }

    static async destroy(user: IUser, category: ICategory): Promise<AxiosResponse<MessageResponse>> {
        return $api.delete<MessageResponse>(`categories/${user.id}/${category.id}`);
    }
}