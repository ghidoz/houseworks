import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseAuthState, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  private authState: FirebaseAuthState;
  public user: any;

  constructor(public auth$: AngularFireAuth) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.user = {
        uid: this.authState.auth.uid,
        name: this.authState.auth.displayName,
        photo: this.authState.auth.photoURL,
        group: 'barcelona'
      };

    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
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
