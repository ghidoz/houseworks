import { Component } from '@angular/core';

import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AddActivityPage } from '../add-activity/add-activity';
import { ActivityService } from '../../providers/activity';
import { FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userActivities: FirebaseListObservable<any[]>;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private activityService: ActivityService,
              private alertCtrl: AlertController,
              private auth: AuthService) {
  }

  ionViewDidLoad() {
    this.userActivities = this.activityService.query();
  }

  public addActivity() {
    this.modalCtrl.create(AddActivityPage).present();
  }

  public onSwipe(event: any, activity: any) {
    let element = event.target.closest('.card');
    if (activity.userId === this.auth.user.$key) {
      element.style['margin-left'] = event.deltaX + 'px';
      if (event.isFinal) {
        if (Math.abs(event.deltaX) >= 100) {
          this.alertCtrl.create({
            title: 'Delete?',
            message: 'Do you want to delete this activity?',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'No',
                handler: () => {
                  element.style['margin-left'] = '';
                }
              },
              {
                text: 'Yes!',
                handler: () => {
                  this.activityService.delete(activity.$key);
                }
              }
            ]
          }).present();
        } else {
          element.style['margin-left'] = '';
        }
      }
    }
  }

}
