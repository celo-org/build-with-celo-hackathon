import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent implements OnInit {

  @Input() options: any [];
  @Input() placeholder: string;
  @Output() updateValueEvent = new EventEmitter<string>();

  value: any = "";

  constructor() { }

  ngOnInit() {}

  optionChanged(e) {
    console.log(e.detail.value + ' ' + e.detail.name);
    this.updateValueEvent.emit(this.value);
  }

}
