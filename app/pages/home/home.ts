import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { LoginPageComponent } from '../login-page/login-page';
import { SessionService } from '../../providers/session-service/session-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePageComponent {
  private navController: NavController;
  private sessionService: SessionService;

  constructor (navController: NavController, sessionService: SessionService) {
      this.navController = navController;
      this.sessionService = sessionService;

      let sessionData = sessionService.getSessionData();

      if (sessionData) {
        // Already logged in
        // Navigate to logged in page

      } else {
        // Not logged in
        // Navigate to login page
        navController.push(LoginPageComponent);
      }

  }

}
