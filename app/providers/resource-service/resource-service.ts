import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResourceService {

    private HOST: string = 'http://umlicmonitoring.com/';

    public data: any;

    constructor(private http: Http) {
        this.http = http;
        this.data = null;
    }

    load() {
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise((resolve, reject) => {
            this.http.get(this.HOST + 'api/resources')
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                }, err => reject(err));
        });
    }
 
    visitWebsite(resource) {
        const auth = JSON.parse(window.localStorage.getItem('auth'));
        return new Promise((resolve, reject) => {
            this.http.post(this.HOST + 'api/resources/' + resource.id + '/visit', {
                    user_id: auth.id
                })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                })
        });
    }
}
