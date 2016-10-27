import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';
import { last }         from 'rxjs/operator/last';

@Injectable()
export class FirebaseService{

    constructor(private _http: Http) {}

    setUser(firstName: string, lastName: string){
        const body = JSON.stringify({firstName: firstName, lastName: 
            lastName});
        return this._http.put('https://dreamstill-d507c.firebaseio.com/user.json', 
        body).map(response => response.json());
    }

    getUser(){
        return this._http.get('https://dreamstill-d507c.firebaseio.com/user.json')
        .map(response => response.json());
    }
}