import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  logout() {
    let animation: AnimationOptions = {
      animated: true,
      animationDirection: "back"
    }
    this.navController.navigateRoot('/home', animation);
  }
}
