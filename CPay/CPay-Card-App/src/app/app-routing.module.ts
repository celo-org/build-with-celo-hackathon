import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./account/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./account/reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./manager/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./manager/cards/cards.module').then( m => m.CardsPageModule)
  },
  {
    path: 'transact',
    loadChildren: () => import('./manager/transact/transact.module').then( m => m.TransactPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./manager/tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
