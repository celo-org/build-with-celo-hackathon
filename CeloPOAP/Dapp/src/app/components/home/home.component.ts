import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides: any[] = new Array(1).fill({id: -1, src: '', title: '', subtitle: '', subtitle2: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/images/carouselback.jpg',
      title: 'ZSales Launchpad',
      subtitle: 'Multi-Chain Crypto Launchpad protocol for web3 creators.',
      subtitle2: 'Create your Token and Raise your IDO/Presales (no coding required).'
    };
    
  }

}
