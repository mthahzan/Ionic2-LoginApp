import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePageComponent {
  private navController: NavController;

  constructor(navController: NavController) {
    this.navController = navController;

  }
}
