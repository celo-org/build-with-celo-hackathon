import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule, ProgressModule, ToastModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonGroupModule } from '@coreui/angular';
import {DpDatePickerModule} from 'ng2-date-picker';
import { TooltipModule } from '@coreui/angular';

import { ModalModule } from '@coreui/angular';

import { AvatarModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { SafePipe } from 'src/app/safe.pipe';
// import { CardModule } from '@coreui/angular';
// import { GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { PoapRoutingModule } from './poap-routing.module';
import { CreatePoapComponent } from './create-poap/create-poap.component';
import { PoapDetailComponent } from './poap-detail/poap-detail.component';


@NgModule({
  declarations: [
    CreatePoapComponent,
    PoapDetailComponent
  ],
  imports: [
    CommonModule,
    PoapRoutingModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonGroupModule,
    DpDatePickerModule ,
    ProgressModule,
    ToastModule,
    TooltipModule,
    ModalModule,
    AvatarModule,
    HttpClientModule ,
    NgxPaginationModule,
    IconModule,
  ]
})
export class PoapModule { }
