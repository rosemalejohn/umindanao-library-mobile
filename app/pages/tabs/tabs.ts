import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ProfilePage} from '../profile/profile';
import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private home: any;
  private about: any;
  private profile: any;
  private login: any;
  private register: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.home = HomePage;
    this.about = AboutPage;
    this.profile = ProfilePage;
    this.login = LoginPage;
    this.register = RegisterPage;
  }
}
