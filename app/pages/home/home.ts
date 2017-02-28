import {Component} from '@angular/core';
import {NavController, Toast, Loading, Alert} from 'ionic-angular';
import {ResourceService} from './../../providers/resource-service/resource-service';
import {AboutPage} from './../about/about';

@Component({
	templateUrl: 'build/pages/home/home.html',
	providers: [ResourceService]
})
export class HomePage {

	public resources: any;

	public fetching: boolean;

	constructor(
		public nav: NavController,
		public resourceService: ResourceService) {

		this.loadResources();
	}

	loadResources() {
		this.fetching = true;
		this.resourceService.load().then(data => {
			this.resources = data;
			this.fetching = false;
		}).catch(err => {
			this.fetching = false;
			let fetchResourceError = Alert.create({
	            title: "Resource error",
	            subTitle: "We cannot fetch the resources.",
	            buttons: [{
	            	text: 'Okay',
	            }]
	        });
	        this.nav.present(fetchResourceError);
		})
	}

	doRefresh(refresher) {
		this.resourceService.load().then(data => {
			this.resources = data;
			refresher.complete();
		}).catch(err => {
			refresher.complete();
		})
	}

	getResource(ev: any) {
		this.loadResources();

	 	let val = ev.target.value;
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			val = val.toLowerCase();
			this.resources = this.resources.filter((resource) => {
				return (resource.name.toLowerCase().indexOf(val) > -1);
			})
		}
	}

	showResource(resource) {
		this.nav.push(AboutPage, {
			resource: resource
		});
	}

	showToast(message: string) {
		let toast = Toast.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		this.nav.present(toast);
	}
	
}
