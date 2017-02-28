import {Component} from '@angular/core';
import {NavController, Loading, Alert, NavParams} from 'ionic-angular';
import {AccountModel} from './../../models/account';
import {Course} from './../../providers/course/course';
import {College} from './../../providers/college/college';
import {Auth} from './../../providers/auth/auth';
import {TabsPage} from './../tabs/tabs';

@Component({
	templateUrl: 'build/pages/register/register.html',
	providers: [Course, Auth, College]
})
export class RegisterPage {

	public isUpdate: boolean;

	public account: Object = {
		id: 0,
		type: 'student',
		firstname: '',
		middlename: '',
		lastname: '',
		id_number: null,
		email: '',
		password: '',
		password_confirmation: '',
		course_id: 0,
		college_id: 0
	}

	public courses: any;

	public colleges: any;

	constructor(
		private nav: NavController, 
		private course: Course, 
		private college: College, 
		private auth: Auth, 
		private params: NavParams) {

		this.nav = nav;

		this.getCourses();

		this.getColleges();

		this.account = params.data ? params.data.profile : this.account;

		this.isUpdate = params.data.isUpdate;
	}

	submit() {
		if (this.isUpdate) {
			this.updateAccount();
		} else {
			this.createAccount();
		}
	}

	createAccount() {
		let loading = Loading.create({ 
			content: "Creating account... Please wait.",
			dismissOnPageChange: true
		});
		this.nav.present(loading);
		this.auth.register(this.account).then(response => {
			this.nav.setRoot(TabsPage);
		}).catch(err => {
			let loginErrorAlert = Alert.create({
            title: "Cannot create account",
            subTitle: 'Validation error. Please check your fields again.',
	            buttons: [{
	            	text: 'Okay',
	            }]
	        });
	        this.nav.present(loginErrorAlert);
		});
	}

	updateAccount() {
		this.auth.update(this.account).then(response => {
			let updateSuccess = Alert.create({
            title: "Account updated",
            subTitle: `You're account has been successfully updated!`,
	            buttons: [{
	            	text: 'Okay',
	            }]
	        });
	        this.nav.present(updateSuccess);
		}).catch(err => {
			let updateErrorAlert = Alert.create({
            title: "Cannot update account",
            subTitle: 'Validation error. Please check your fields again.',
	            buttons: [{
	            	text: 'Okay',
	            }]
	        });
	        this.nav.present(updateErrorAlert);
		});
	}

	getCourses() {
		this.course.load().then(response => {
			this.courses = response;
			console.log(response);
		});
	}

	getColleges() {
		this.college.load().then(response => {	
			this.colleges = response;
		}).catch(err => {
			alert('Weve got an error: ' + JSON.stringify(err));
		});
	}
}
