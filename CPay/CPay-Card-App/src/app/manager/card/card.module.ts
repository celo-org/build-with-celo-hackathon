import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardPageRoutingModule } from './card-routing.module';

import { CardPage } from './card.page';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { MyCardComponent } from 'src/app/components/my-card/my-card.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { SingleSelectComponent } from 'src/app/components/single-select/single-select.component';
import { ImageComponent } from 'src/app/components/image/image.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPageRoutingModule
  ],
  declarations: [CardPage, ButtonComponent, MyCardComponent, InputComponent, 
    SingleSelectComponent, ImageComponent, CheckboxComponent]
})
export class CardPageModule {}
