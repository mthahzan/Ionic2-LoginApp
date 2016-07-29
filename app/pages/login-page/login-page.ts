import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePageComponent } from '../home/home';
import { LoggedPageComponent } from '../logged-page/logged-page';
/*
  Generated class for the LoginPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login-page/login-page.html',
})
export class LoginPageComponent {
  constructor(private nav: NavController) {}

private userName :string;
private password :string;
  login() {
    if (this.userName=='test'&& this.password=='test' ) {
        this.nav.push(LoggedPageComponent);
        console.log('logged in');
  } else {
      window.alert("login failed!!");
    }
  }

}
