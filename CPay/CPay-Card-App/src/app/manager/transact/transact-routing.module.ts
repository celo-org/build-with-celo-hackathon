import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactPage } from './transact.page';

const routes: Routes = [
  {
    path: '',
    component: TransactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactPageRoutingModule {}
