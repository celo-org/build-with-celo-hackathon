import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { VirtualCard } from 'src/app/models/models';

import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { BaseRequest } from 'src/app/models/Base';
import { XmlSerializerService } from 'src/app/serializer/xml-serializer.service';
import { CreateVirtualCardRequest } from './models/CreateVirtualCard';
import { ValuesService } from 'src/app/services/values.service';

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

  createCardRequest: CreateVirtualCardRequest = new CreateVirtualCardRequest();

  constructor(@Inject(LOCALE_ID) private locale: string, 
    private alertController: AlertController, private valuesService: ValuesService) { }

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

    console.log(this.createCardRequest);

    this.createCardModal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    this.createCardRequest.terminalID = this.valuesService.getTerminalID();
    this.createCardRequest.campaignUUID = this.valuesService.getCampaignUUID();
    this.createCardRequest.transactionID = this.valuesService.getTransactionID();
    this.createCardRequest.transactionDate = new Date();
    this.createCardRequest.checksum = this.valuesService.getChecksum();
    console.log(this.createCardRequest);
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(this.createCardRequest.serialize());
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
  console.log("submit");
  let base = new CreateVirtualCardRequest();
  base.terminalID = "TerminalID12345";
  base.campaignUUID = "ghvchv654cewhwe4c4wewejh";
  base.customerReference = "myref123456";
  base.cardLabel = "My New Card";
  base.notificationNumber = "0796482349";
  base.expiryDate = new Date("2025/11/02");
  base.transactionID = "TransactionID12345";
  base.transactionDate = new Date();
  base.checksum = "123456";

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

 updateRef(ref: any) {
  this.createCardRequest.customerReference = ref;
 }

 updateCardLabel(label: any) {
  this.createCardRequest.cardLabel = label;
 }

 updateNotificationNumber(num: any) {
  this.createCardRequest.notificationNumber = num;
 }

 updateExpiryDate(date: any) {
  this.createCardRequest.expiryDate = new Date(date);
 }

}
