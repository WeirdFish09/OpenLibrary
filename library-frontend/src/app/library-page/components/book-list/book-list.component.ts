import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  public bookList: Book[];

  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.getBooks().subscribe(result => {
      this.bookList = result;
    }); 
  }
}