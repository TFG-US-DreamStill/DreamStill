import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';
import { last }         from 'rxjs/operator/last';

@Injectable()
export class FirebaseService{
    private configData: Object;

    constructor(private _http: Http) {
        _http.get('passwords.json')
                  .map(res => res.json())
                  .subscribe(
                     (data) => {
                       this.configData=data["Firebase"].secret;
                     },
                     err=>console.log(err),
                     ()=>console.log('done')
                   );
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

    getMorpheuzDataOfUserAtDate(date: Date){
        var year: String = ""+date.getFullYear();
        var month:string  = String(date.getMonth()+1);
        var day: String = ("0" + date.getDate()).slice(-2);
        return this._http.get('getMorpheuzDataAtDate?date='+year+'-'+month+'-'+day).map(response => response.json());
    }

    getMorpheuzDaysWithData(){
        return this._http.get('getMorpheuzDaysWithData').map(response => response.json());
    }
}