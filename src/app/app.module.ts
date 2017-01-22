import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AddActivityPage } from '../pages/add-activity/add-activity';
import { UserService } from '../providers/user-service';

export const firebaseConfig = {
  apiKey: 'AIzaSyDLmHpaUw-YK2dP-zT8j1n44WntFrrcJYw',
  authDomain: 'houseworks-ffa4e.firebaseapp.com',
  databaseURL: 'https://houseworks-ffa4e.firebaseio.com',
  storageBucket: 'houseworks-ffa4e.appspot.com'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddActivityPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddActivityPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService
  ]
})
export class AppModule {}
