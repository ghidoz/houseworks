import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {
  FirebaseAuthState, AngularFireAuth, AuthProviders, AuthMethods, AngularFire,
  FirebaseObjectObservable
} from 'angularfire2';
import { Observable } from 'rxjs';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  private authState: FirebaseAuthState;
  public user: any;

  constructor(public auth$: AngularFireAuth,
              private af: AngularFire) {
  }

  checkAuth(): Observable<any> {
    return this.auth$.flatMap((state: FirebaseAuthState) => {
      if (state) {
        this.authState = state;
        let user$: FirebaseObjectObservable<any> = this.af.database.object('/users/' + this.authState.auth.uid);
        return user$.map((user: any) => {
          if (!user.$exists()) {
            this.user = {
              name: this.authState.auth.displayName,
              photo: this.authState.auth.photoURL,
              group: 'barcelona',
              points: 0
            };
            user$.set(this.user);
          } else {
            this.user = user;
          }
          return this.user;
        });
      } else {
        return Observable.of(null);
      }
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signIn(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.google.displayName;
    } else {
      return '';
    }
  }
}
