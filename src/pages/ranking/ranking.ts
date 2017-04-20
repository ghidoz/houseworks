import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ActivityService } from '../../providers/activity';
import { FirebaseListObservable } from 'angularfire2';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html'
})
export class RankingPage {

  public ranking: FirebaseListObservable<any[]>;
  private startAt$: Subject<number> = new BehaviorSubject<number>(null);
  private filter: string = 'week';

  constructor(public navCtrl: NavController,
              private activityService: ActivityService) {

  }

  ionViewDidLoad() {
    this.ranking = this.activityService.ranking(this.startAt$);
    this.filterStats();
  }

  public filterStats() {
    let date: number = null;
    if (this.filter === 'week') {
      date = new Date().getTime() - 1000 * 60 * 60 * 24 * 7;
    } else if (this.filter === 'month') {
      date = new Date().getTime() - 1000 * 60 * 60 * 24 * 30;
    }
    this.startAt$.next(date);
  }

}
