import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { VirtualCard } from 'src/app/models/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  cards: VirtualCard [] = [];

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.getCards();
    console.log(this.formatPAC("1234567890123456"));
    console.log(this.formatDate(new Date()));
  }

  getCards() {
    for(let i = 0; i < 30; i++) {
      this.cards.push(new VirtualCard());
    }
  }

  formatPAC(pac: string): string {
    return pac.match(/.{1,4}/g).join(" ");
  }

  formatDate(date: Date) {
    return formatDate(date, 'yyyy/MM/dd', this.locale);
  }

}
