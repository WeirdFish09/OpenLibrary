import { Genre } from "./Genre";

export interface Book {
    bookId: string;
    title: string;
    description: string;
    imageLink?: string;
    author: string;
    genres: Genre[];
}