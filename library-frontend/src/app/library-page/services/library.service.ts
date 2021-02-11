import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>("books?count=10&offset=0");
  }
  
  getBookById(id: string) {
    return this.http.get<Book>(`books/${id}`);
  }
}
