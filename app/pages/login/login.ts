import {Component} from '@angular/core';
import {NavController, Loading, Alert, Platform} from 'ionic-angular';
import {RegisterPage} from './../register/register';
import {TabsPage} from './../tabs/tabs';
import {Auth} from './../../providers/auth/auth';

declare var navigator: any;
declare var Connection: any;

@Component({
	templateUrl: 'build/pages/login/login.html',
	providers: [Auth]
})

export class LoginPage {


	public email: any;

	public password: any;

	constructor(private platform: Platform, private nav: NavController, private auth: Auth) {
		this.platform.ready().then(() => {
			var networkState = navigator.connection.type;
	        var states = {};
	        states[Connection.UNKNOWN]  = 'Unknown connection';
	        states[Connection.ETHERNET] = 'Ethernet connection';
	        states[Connection.WIFI]     = 'WiFi connection';
	        states[Connection.CELL_2G]  = 'Cell 2G connection';
	        states[Connection.CELL_3G]  = 'Cell 3G connection';
	        states[Connection.CELL_4G]  = 'Cell 4G connection';
	        states[Connection.CELL]     = 'Cell generic connection';
	        states[Connection.NONE]     = 'No network connection';

	        if (networkState == 'Connection.NONE' || networkState == Connection.NONE) {
	        	let alert = Alert.create({
	            title: "No network connection",
	            subTitle: "Connection cannot established.",
		            buttons: [{
		            	text: 'Exit',
		            	handler: () => {
		            		this.platform.exitApp();
		            	}
		            }]
		        });
		        this.nav.present(alert);
	        }
		})
		
	}

	login() {
		if (this.email && this.password) {
			let loading = Loading.create({
				content: "Logging in... Please wait.",
				dismissOnPageChange: true
			});
			this.nav.present(loading);

			this.auth.login({email: this.email, password: this.password}).then(response => {
				this.nav.setRoot(TabsPage);
			}).catch(err => {
				let loginErrorAlert = Alert.create({
	            title: "Cannot Login",
	            subTitle: "Username or password is incorrect..",
		            buttons: [{
		            	text: 'Okay',
		            }]
		        });
		        this.nav.present(loginErrorAlert);
			});	
		} else {
			let validationErrorAlert = Alert.create({
	            title: "Validation error",
	            subTitle: "Username and password are required.",
	            buttons: [{
	            	text: 'Okay',
	            }]
	        });
	        this.nav.present(validationErrorAlert);
		}
		
	}

	register() {
		this.nav.push(RegisterPage, {
			profile: {},
			isUpdate: false
		});
	}
}
