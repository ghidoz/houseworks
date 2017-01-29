import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { AddActivityPage } from '../add-activity/add-activity';
import { ActivityService } from '../../providers/activity';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userActivities: FirebaseListObservable<any[]>;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private activityService: ActivityService) {
  }

  ionViewDidLoad() {
    this.userActivities = this.activityService.query();
  }

  public addActivity() {
    this.modalCtrl.create(AddActivityPage).present();
  }

}
