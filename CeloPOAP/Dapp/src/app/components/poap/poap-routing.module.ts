import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePoapComponent } from './create-poap/create-poap.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePoapComponent,
    data: {
      title: 'Gallery'
    }
  },
  {
    path: 'create',
    component: CreatePoapComponent,
    data: {
      title: 'Create POAP'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoapRoutingModule { }
