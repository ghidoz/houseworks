import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from './auth-service';
import * as firebase from 'firebase'

/*
  Generated class for the Activity provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActivityService {

  private list: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire,
              private userService: AuthService) {
  }

  query(): FirebaseListObservable<any[]> {
    this.list = this.af.database.list('/' + this.userService.user.group + '/userActivities', {
      query: {
        orderByKey: true
      }
    })
      .map((activities: any) => {
        activities = activities.reverse();
        activities.map((userActivity: any) => {
          userActivity.activity = this.af.database.object('/' + this.userService.user.group + '/activities/' + userActivity.activity);
          userActivity.user = this.af.database.object('/users/' + userActivity.user);
        });
        return activities;
      }) as FirebaseListObservable<any[]>;
    return this.list;
  }

  save(id: string) {
    let userActivity: any = {
      user: this.userService.user.$key,
      activity: id,
      date: firebase.database.ServerValue.TIMESTAMP
    };
    this.list.push(userActivity);
  }

}
