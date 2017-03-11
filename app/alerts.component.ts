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
    isChecked: Boolean;

    constructor(private _firebaseService: FirebaseService, private _http: Http) {
         _http.get('/getLoggedUser')
                  .map(res => res.json())
                  .subscribe(
                     (data) => {
                       this.user=data;
                       console.log(this.user)
                       this.isChecked = this.user["alerts"];;
                     },
                     err=>console.log(err),
                     ()=>console.log('done')
                   );
     }

    ngOnInit() { }

    changeAlerts(event: Event): void{
        console.log(event["checked"]);
        window.location.href='/setAlerts?alerts='+event["checked"];
     }
}