import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from './components/book-item/book-item.component';
import { MaterialDataModule } from '../material-data/material-data.module';
import { BookListComponent } from './components/book-list/book-list.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent
  ],
  imports: [
    CommonModule,
    MaterialDataModule
  ],
  exports: [
    BookListComponent
  ]
})
export class LibraryPageModule { }
