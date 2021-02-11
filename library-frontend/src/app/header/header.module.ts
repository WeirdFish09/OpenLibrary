import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialDataModule } from '../material-data/material-data.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialDataModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
