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
    alerts: JSON;
    isChecked: String;
    hours: Number;
    days: Number;

    constructor(private _firebaseService: FirebaseService, private _http: Http) {
         _http.get('/getUserAlert')
                  .map(res => res.json())
                  .subscribe(
                     (data) => {
                       this.alerts=data;
                       console.log(this.alerts)
                       if(this.alerts["alerts"]==='true'){
                           this.isChecked = 'true';
                           this.hours = this.alerts["hours"];
                           this.days = this.alerts["days"]
                       }
                     },
                     err=>console.log(err),
                     ()=>console.log('done')
                   );
     }

    ngOnInit() { }

    changeAlerts(event: Event): void{
        if (event["checked"]) {
            if (this.hours!=undefined && this.days!=undefined) {
                console.log("Test");
            }else{

            }
        }else{

        }
        console.log(event["checked"]);
        console.log(this.hours);
        console.log(this.days);
        this._firebaseService.setAlerts(event["checked"], this.hours, this.days).subscribe(
                          response => { console.log(response)});
     }
}