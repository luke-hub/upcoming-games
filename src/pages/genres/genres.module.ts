import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenresPage } from './genres';

@NgModule({
  declarations: [
    GenresPage,
  ],
  imports: [
    IonicPageModule.forChild(GenresPage),
  ],
  exports: [
    GenresPage
  ]
})
export class GenresPageModule {}
