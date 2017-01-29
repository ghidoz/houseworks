import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActivityService } from '../../providers/activity';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  public stats: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              private activityService: ActivityService) {

  }

  ionViewDidLoad() {
    this.stats = this.activityService.stats();
  }

}
