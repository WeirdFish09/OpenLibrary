import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/library-page/models/Book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  book: Book

  constructor() { }

  ngOnInit(): void {
    this.book =   {
      description: "Descrtipion 1",
      genres: [],
      id: "1",
      name: "Test book 1"
    };
  }
}


