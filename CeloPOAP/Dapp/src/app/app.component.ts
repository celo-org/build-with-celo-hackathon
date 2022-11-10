import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { Web3Service } from './services/web3.service';




@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'CeloPOAP';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private web3Service: Web3Service
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }

  // async connect (){
  //   await this.web3Service.connect();
  // }
}
