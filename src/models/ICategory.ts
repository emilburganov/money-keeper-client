export interface ICategory {
    id: number;
    name: string;
    description: string;
    type_id: number;
    type_name: string;

    filter(param: (_category: ICategory) => boolean): ICategory[];
}