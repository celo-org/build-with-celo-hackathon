import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { VirtualCard } from '../../models/models'

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.scss'],
})
export class MyCardComponent implements OnInit {

  @Input() card: VirtualCard;

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {

  }

  getCards() {
    
  }

  formatPAN(pac: string): string {
    return pac.match(/.{1,4}/g).join(" ");
  }

  formatDate(date: Date) {
    return formatDate(date, 'yyyy/MM/dd', this.locale);
  }

}
