import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss'],
})
export class DatetimeComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @Input() type: string = "datetime";
  @Input() placeholder: string = "Select Date";
  @Output() changeEvent = new EventEmitter<string>();

  minDate: string = new Date().toISOString();
  value: string = new Date().toISOString();
  displayValue: string = this.value.slice(0, 10);

  constructor() { }

  ngOnInit() {}

  onWillDismiss(event: Event) {
    this.displayValue = this.value.slice(0, 10);
    this.changeEvent.emit(this.value);
  }

}
