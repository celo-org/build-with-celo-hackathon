import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { ListingHomeComponent } from './listing-home/listing-home.component';

const routes: Routes = [
  {
    path: '',
    component: ListingHomeComponent,
    data: {
      title: 'POAP Market'
    }
  },
  {
    path: 'list-poap',
    component: ListingComponent,
    data: {
      title: 'List your POAP'
    }
  },
  {
    path: 'd/:nft/:tokenId',
    component: ListingComponent,
    data: {
      title: 'POAP'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoapMarketRoutingModule { }
