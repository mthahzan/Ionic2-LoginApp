import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { SessionService } from './providers/session-service/session-service';
import { HomePageComponent } from './pages/home/home';


@Component({
  templateUrl: 'build/app.html'
})
export class MyAppComponent {
  rootPage: any = HomePageComponent;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyAppComponent, [SessionService], {prodMode: true});
