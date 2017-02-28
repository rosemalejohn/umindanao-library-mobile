import {Component} from '@angular/core';
import {Platform, MenuController, ionicBootstrap, Alert, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {Auth} from './providers/auth/auth';

declare var navigator: any;
declare var Connection: any;

@Component({
	templateUrl: 'build/app.html',
	providers: [Auth]
})
export class MyApp {

	private rootPage: any;

	constructor(private platform: Platform, public auth: Auth, private menu: MenuController) {

		this.checkIfAuthenticated();

		this.platform.ready().then(() => {

			if (this.platform.is('android')) {
				StatusBar.backgroundColorByHexString("#BE4743");
			}
 			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
		});
	}

	checkIfAuthenticated() {
		if (this.auth.isAuthenticated()) {
			this.rootPage = TabsPage;
		} else {
			this.menu.enable(false, 'authenticated');
			this.rootPage = LoginPage;
		}
	}

	isAuthenticated() {
		return this.auth.isAuthenticated();
	}

	clearData() {
		window.localStorage.clear();
	}

	logout() {
		window.localStorage.removeItem('auth');
		this.rootPage = LoginPage;
		console.info('Logged out user: ' + window.localStorage.getItem('auth'));
	}

}

ionicBootstrap(MyApp);
