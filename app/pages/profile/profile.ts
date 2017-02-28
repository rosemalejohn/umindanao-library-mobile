import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from './../register/register';

@Component({
	templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {

	public profile: any;

	constructor(private navCtrl: NavController) {
		this.profile = JSON.parse(window.localStorage.getItem('auth'));
	}

	editProfile() {
		this.navCtrl.push(RegisterPage, {
			profile: this.profile,
			isUpdate: true
		});
	}
}
