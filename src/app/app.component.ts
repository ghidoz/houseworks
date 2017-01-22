import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { AngularFire } from 'angularfire2';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewChild } from '@angular/core/src/metadata/di';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public rootPage;

  constructor(platform: Platform,
              private af: AngularFire) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.checkAuth();
    });
  }

  checkAuth() {
    this.af.auth.subscribe((data: any)=> {
      if (!data) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = TabsPage;
      }
    });
  }
}
