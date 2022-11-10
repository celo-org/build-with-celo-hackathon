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
      src: './assets/images/celo-poap.jpg',
      title: 'Celo POAP',
      subtitle: 'Make your events Memorable.',
      subtitle2: 'Issue a POAP for it today.'
    };
    
  }

}
