import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/library-page/models/Book';
import { LibraryService } from 'src/app/library-page/services/library.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  book: Book

  constructor(
    private libraryService: LibraryService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(el => {
      var id = el.get('id');

      if (!!id) {
        this.libraryService.getBookById(el.get('id')).subscribe(result => {
          this.book = result;
        })
      }
    });
  }

  firstLetter() {
    return this.book.description[0];
  }

  description() {
    return this.book.description.substr(1);

  }
}


