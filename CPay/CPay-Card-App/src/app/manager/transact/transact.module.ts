import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactPageRoutingModule } from './transact-routing.module';

import { TransactPage } from './transact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactPageRoutingModule
  ],
  declarations: [TransactPage]
})
export class TransactPageModule {}
