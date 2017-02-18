import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from './auth-service';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs';

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
        orderByChild: 'date'
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

  delete(id: string) {
    this.list.remove(id);
  }

  stats(startAt$: Subject<number>): FirebaseListObservable<any[]> {
    return this.af.database.list('/' + this.userService.user.group + '/userActivities', {
      query: {
        orderByChild: 'date',
        startAt: startAt$
      }
    }).map((response: any) => {
      response = _.groupBy(response, 'activity');
      response = _.values(_.mapValues(response, (userActivity: any, activityId: string) => {
        let users: any = _.countBy(userActivity, 'user');
        let lastUserId: any = (_.last(_.orderBy(userActivity, 'date')) as any).user;
        users = _.reverse(_.orderBy(_.values(_.mapValues(users, (count: number, userId: string) => {
          return {
            user: this.af.database.object('/users/' + userId),
            count: count,
            last: userId === lastUserId
          };
        })), 'count'));
        return {
          activity: this.af.database.object('/' + this.userService.user.group + '/activities/' + activityId),
          users: users
        }
      }));
      return response;
    }) as FirebaseListObservable<any[]>
  }

  ranking(startAt$: Subject<number>): FirebaseListObservable<any[]> {
    return this.af.database.list('/' + this.userService.user.group + '/userActivities', {
      query: {
        orderByChild: 'date',
        startAt: startAt$
      }
    }).flatMap((response: any) => {
      response = _.groupBy(response, 'user');
      return Observable.combineLatest(
        _.values(_.mapValues(response, (userActivities: any, userId: string) => {
          return Observable.combineLatest(
            userActivities.map((userActivity) => this.af.database.object('/' + this.userService.user.group + '/activities/' + userActivity.activity))
          ).map((activities) => {
            return {
              user: this.af.database.object('/users/' + userId),
              points: _.sumBy(activities, 'points')
            }
          });
        }))
      ).map((rankings) => {
        return _.reverse(_.orderBy(rankings, 'points'));
      });
    }) as FirebaseListObservable<any[]>
  }

}
