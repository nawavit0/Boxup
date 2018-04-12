import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordComponent } from './word.component';

const routes: Routes = [
  {
    path: '',
    component: WordComponent,
    data: {
      title: 'Words'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordRoutingModule {}
