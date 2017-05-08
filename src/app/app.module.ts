import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RankingPage } from '../pages/ranking/ranking';
import { StatsPage } from '../pages/stats/stats';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';
import { AddActivityPage } from '../pages/add-activity/add-activity';
import { ActivityService } from '../providers/activity';
import { AuthService } from '../providers/auth-service';
import { firebaseConfig } from './config';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RankingPage,
    StatsPage,
    HomePage,
    TabsPage,
    AddActivityPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RankingPage,
    StatsPage,
    HomePage,
    TabsPage,
    AddActivityPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ActivityService,
    AuthService
  ]
})
export class AppModule {}
