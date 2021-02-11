import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  public bookList: Book[];

  constructor() { }

  ngOnInit(): void {
    this.bookList = books;
  }
}


const books: Book[] = [
  {
    description: "Descrtipion 1",
    genres: [],
    id: "1",
    imageLink: "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature_1200x627.jpg?quality=89&w=1200",
    name: "Test book 1"
  },
  {
    description: "Descrtipion 1",
    genres: [],
    id: "1",
    name: "Test book 1"
  }
];