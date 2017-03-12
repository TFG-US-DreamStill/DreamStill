import { Component, OnInit } from '@angular/core';
import { FirebaseService }  from './firebase.service';
import { Http }         from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'alerts',
    styleUrls: ['alerts.component.css'],
    templateUrl: 'alerts.component.html'
})
export class AlertsComponent implements OnInit {
    user: JSON;
    isChecked: String;

    constructor(private _firebaseService: FirebaseService, private _http: Http) {
         _http.get('/getLoggedUser')
                  .map(res => res.json())
                  .subscribe(
                     (data) => {
                       this.user=data;
                       console.log(this.user)
                       if(this.user["alerts"]==='true'){
                           this.isChecked = 'true';
                       }
                     },
                     err=>console.log(err),
                     ()=>console.log('done')
                   );
     }

    ngOnInit() { }

    changeAlerts(event: Event): void{
        console.log(event["checked"]);
        this._firebaseService.setAlerts(event["checked"]).subscribe(
                          response => { console.log(response)});
     }
}