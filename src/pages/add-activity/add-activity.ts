import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { ActivityService } from '../../providers/activity';

/*
 Generated class for the AddActivity page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-activity',
  templateUrl: 'add-activity.html'
})
export class AddActivityPage {

  activities: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private af: AngularFire,
              private authService: AuthService,
              private activityService: ActivityService) {
  }

  ionViewDidLoad() {
    this.activities = this.af.database.list('/' + this.authService.user.group + '/activities');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add(id: string) {
    this.activityService.save(id);
    this.viewCtrl.dismiss();
  }

}
