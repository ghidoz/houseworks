import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public rootPage;

  constructor(platform: Platform,
              private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.checkAuth();
    });
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any)=> {
      if (!data) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = TabsPage;
      }
    });
  }
}
