import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';
import { last }         from 'rxjs/operator/last';
import { Config }           from './config.service';  

@Injectable()
export class FirebaseService{
    private configData: Object;

    constructor(private _http: Http, private _config: Config) {
        _config.load()
        this.configData = _config.get("Firebase").secret
    }

    setUser(firstName: string, lastName: string){
        const body = JSON.stringify({firstName: firstName, lastName: 
            lastName});
        return this._http.put('https://dreamstill-d507c.firebaseio.com/user.json?auth='+this.configData, 
        body).map(response => response.json());
    }

    setUserData(user: string, json: String){
        const body = json;
        return this._http.patch("https://dreamstill-d507c.firebaseio.com/"+user+".json?auth="+this.configData,body).map(response => response.json());
    }

    getUser(){
        return this._http.get('https://dreamstill-d507c.firebaseio.com/user.json?auth='+this.configData)
        .map(response => response.json());
    }

    getUserData(user: string){
        return this._http.get('https://dreamstill-d507c.firebaseio.com/'+user+'.json?auth='+this.configData).map(response => response.json());
    }

    getMorpheuzDataOfUserAtDate(user: String, date: Date){
        var year: String = ""+date.getFullYear();
        var month: String = ""+date.getMonth();
        var day: String = ""+date.getDay();
        return this._http.get('https://dreamstill-d507c.firebaseio.com/'+user+'/'+year+'-'+month+'-'+day+'.json?auth='+this.configData).map(response => response.json());
    }
}