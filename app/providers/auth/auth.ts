import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {

	public HOST: string = 'http://umlicmonitoring.com/';

	public auth: any;

	constructor(private http: Http) {
		this.http = http;
		this.auth = null;
	}


	login(credentials) {
		if (this.auth) {
			return Promise.resolve(this.auth);
		}

		return new Promise((resolve, reject) => {
			this.http.post(this.HOST + 'api/login', credentials)
				.map(res => res.json())
				.subscribe(data => {
					this.setAuthToLocalStorage(data);
					resolve(this.auth);
				}, err => reject(err));
		}); 
	}

	register(details) {
		return new Promise((resolve, reject) => {
			this.http.post(this.HOST + 'api/register', details)
				.map(res => res.json())
				.subscribe(data => {
					this.setAuthToLocalStorage(data);
					resolve(data);
				}, err => reject(err));
		})
	}

	logout() {
		window.localStorage.removeItem('auth');
	}

	isAuthenticated() {
		if (window.localStorage.getItem('auth')) {
			return true;
		}
		return false;
	}

	setAuthToLocalStorage(auth) {
		window.localStorage.setItem('auth', JSON.stringify(auth));
		console.info('Authenticated user: ' + window.localStorage.getItem('auth'));
	}

	update(details) {
		return new Promise((resolve, reject) => {
			this.http.post(this.HOST + `api/visitors/${details.id}/update`, details)
				.map(res => res.json())
				.subscribe(data => {
					this.setAuthToLocalStorage(data);
					resolve(data);
				}, err => reject(err));
		})
	}
}

