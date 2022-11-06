import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {

  @Input() type: string;
  @Input() placeholder: string;
  @Input() maxlength: string;
  @Output() changeEvent = new EventEmitter<string>();

  value: string;

  constructor() { }

  textChanged() {
    this.changeEvent.emit(this.value);
  }

}
