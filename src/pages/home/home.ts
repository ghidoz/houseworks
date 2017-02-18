import { Component } from '@angular/core';

import { NavController, ModalController, AlertController } from 'ionic-angular';
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
              private activityService: ActivityService,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.userActivities = this.activityService.query();
  }

  public addActivity() {
    this.modalCtrl.create(AddActivityPage).present();
  }

  public onSwipe(event: any, activityId: string) {
    let element = event.target.closest('.card');
    element.style['margin-left'] = event.deltaX + 'px';
    if (event.isFinal) {
      this.alertCtrl.create({
        title: 'Delete?',
        message: 'Do you want to delete this activity?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              element.style['margin-left'] = '';
            }
          },
          {
            text: 'Yes, delete!',
            handler: () => {
              this.activityService.delete(activityId);
            }
          }
        ]
      }).present();
    }
  }

}
