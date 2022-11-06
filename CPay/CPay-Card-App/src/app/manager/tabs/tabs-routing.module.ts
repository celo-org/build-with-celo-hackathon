import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/app/home/home.page';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: 'card',
        loadChildren: () => import('../card/card.module').then( m => m.CardPageModule)
      },
      {
        path: 'transact',
        loadChildren: () => import('../transact/transact.module').then( m => m.TransactPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/card',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'logout',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
