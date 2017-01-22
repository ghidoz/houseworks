import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { AddActivityPage } from '../add-activity/add-activity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) {

  }

  public addActivity() {
    this.modalCtrl.create(AddActivityPage).present();
  }

}
