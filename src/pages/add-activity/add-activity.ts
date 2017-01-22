import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from '../../providers/user-service';

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
              private userService: UserService) {
  }

  ionViewDidLoad() {
    this.activities = this.af.database.list('/' + this.userService.user.group + '/activities');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
