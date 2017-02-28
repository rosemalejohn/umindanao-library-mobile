import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {ResourceService} from './../../providers/resource-service/resource-service';

declare var cordova: any;

@Component({
	templateUrl: 'build/pages/about/about.html',
	providers: [ResourceService]
})
export class AboutPage {

	public resource: any;
	
	constructor(private platform: Platform, 
		private navCtrl: NavController, 
		private params: NavParams, 
		private resourceService: ResourceService) {
		this.resource = params.data.resource;
	}

	launchWebsite(url) {
		this.platform.ready().then(() => {
			this.resourceService.visitWebsite(this.resource).then(response => {
				console.log(response);
				cordova.InAppBrowser.open(url, '_self', 'location=true');
			});
		});
	}
}
