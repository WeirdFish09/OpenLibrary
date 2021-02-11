import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openBook(): void {
    console.log(this.book.bookId)
    this.router.navigateByUrl(`/book/${this.book.bookId}`);
  }
}
