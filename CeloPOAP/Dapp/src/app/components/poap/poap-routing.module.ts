import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePoapComponent } from './create-poap/create-poap.component';
import { PoapDetailComponent } from './poap-detail/poap-detail.component';

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
  },
  {
    path: 'd/:poapId',
    component: PoapDetailComponent,
    data: {
      title: 'POAP'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoapRoutingModule { }
