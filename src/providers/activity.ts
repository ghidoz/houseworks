import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from './user-service';

/*
  Generated class for the Activity provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActivityService {

  private list: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire,
              private userService: UserService) {
  }

  query() {
    this.list = this.af.database.list('/' + this.userService.user.group + '/userActivities');
    return this.list;
  }

  save(id: string) {
    let userActivity: any = {
      user: this.userService.user.uid,
      activity: id
    };
    this.list.push(userActivity);
  }

}
