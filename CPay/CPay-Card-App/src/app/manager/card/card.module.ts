import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardPageRoutingModule } from './card-routing.module';

import { CardPage } from './card.page';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { MyCardComponent } from 'src/app/components/my-card/my-card.component';
import { InputComponent } from 'src/app/components/input/input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPageRoutingModule
  ],
  declarations: [CardPage, ButtonComponent, MyCardComponent, InputComponent]
})
export class CardPageModule {}
