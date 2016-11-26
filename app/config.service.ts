import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable }  from 'rxjs/Observable';

@Injectable()
 export class Config {
 private _config: Object

 constructor(private http: Http) {
 }

 load() {
    return new Promise((resolve, reject) => {
      this.http.get('/passwords.json')
      .map(res => res.json())
      .catch((error: any) => {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
      })
      .subscribe((data) => {
        this._config = data;
        resolve(true);
      });
  });
  }

 get(key: any) {
   return this._config[key];
 }

};