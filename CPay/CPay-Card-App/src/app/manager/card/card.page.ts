import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { VirtualCard } from 'src/app/models/models';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  @ViewChild(IonModal) createCardModal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

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

  back() {
    this.createCardModal.dismiss(null, 'cancel');
  }

  submit() {
    this.createCardModal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  formatPAC(pac: string): string {
    return pac.match(/.{1,4}/g).join(" ");
  }

  formatDate(date: Date) {
    return formatDate(date, 'yyyy/MM/dd', this.locale);
  }

}
