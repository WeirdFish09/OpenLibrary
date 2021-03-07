import { Genre } from './Genre';

export interface Book {
    bookId: string;
    title: string;
    author: string;
    description: string;
    imageLink: string;
    fileURL: string;
    status: string;
    genres: Genre[];
}