import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { RankingPage } from '../ranking/ranking';
import { StatsPage } from '../stats/stats';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = StatsPage;
  tab3Root: any = RankingPage;

  constructor() {

  }
}
