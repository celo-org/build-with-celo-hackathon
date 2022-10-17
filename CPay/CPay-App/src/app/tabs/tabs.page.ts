import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isLoggedIn: boolean = false;
  login: string = "Login";
  enabled: string = "disabled";

  constructor() {}

  toggleLogin() {
    if(this.isLoggedIn) {
      this.login = "Login";
      this.isLoggedIn = false;
      this.enabled = "disabled";
    } else {
      this.login = "Logout";
      this.isLoggedIn = true;
      this.enabled = "";
    }
  }

}
