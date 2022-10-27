import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { VirtualCard } from 'src/app/models/models';

import { AlertController, IonModal } from '@ionic/angular';
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
  titleList: any[] = [
    { "name": "Mr", "value": "Mr" }, { "name": "Mrs", "value": "Mrs" }, { "name": "Ms", "value": "Ms" },
    { "name": "Miss", "value": "Miss" }
  ];

  constructor(@Inject(LOCALE_ID) private locale: string, 
    private alertController: AlertController) { }

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

 async confirmCreateCardAlert() {
  const alert = await this.alertController.create({
    header: 'Request new card?',
    cssClass: '',
    buttons: [
      {
        text: 'Cancel',
        cssClass: ''
      },
      {
        text: 'Confirm',
        cssClass: ''
      }
    ]
  });

  await alert.present();
 }

}
