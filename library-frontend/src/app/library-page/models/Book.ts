import { Genre } from "./Genre";

export interface Book {
    id: string;
    name: string;
    description: string;
    imageLink?: string;
    genres: Genre[];
}