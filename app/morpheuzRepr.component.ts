import { Component, OnInit } from '@angular/core';
import { Csv2JsonService }   from './csv2json.service';
import { FirebaseService }   from './firebase.service';

var exampleEMail = `
                    Chart Display
                    Report
                    CSV Sleep data
                    01:11,2354
                    01:21,1352
                    01:31,72
                    01:41,1975
                    01:51,1224
                    02:01,75
                    02:11,55
                    02:21,896
                    02:31,1127
                    02:41,244
                    02:51,342
                    03:01,928
                    03:11,117
                    03:21,71
                    03:31,162
                    03:41,86
                    03:51,922
                    04:01,1107
                    04:11,458
                    04:21,600
                    04:31,172
                    04:41,51
                    04:51,53
                    05:01,51
                    05:11,1046
                    05:21,599
                    05:31,989
                    05:41,1093
                    05:51,943
                    06:01,972
                    06:11,124
                    06:21,56
                    06:31,717
                    06:41,66
                    06:51,55
                    07:01,628
                    07:11,568
                    07:21,2153
                    07:31,848
                    07:41,72
                    07:51,61
                    08:01,2605
                    08:11,2082
                    08:21,2325
                    08:31,66
                    08:41,176
                    08:51,74
                    09:01,-1
                    09:11,-1
                    09:21,-1
                    09:31,-1
                    09:41,-1
                    09:51,-1
                    10:01,-1
                    10:11,-1
                    10:21,-1
                    10:31,-1
                    10:41,-1
                    10:51,-1
                    11:01,-1
                    08:45,START
                    09:00,END
                    09:00,ALARM
                    1,SNOOZES

                    Note: -1 is no data captured, -2 is ignore set, ALARM, START and END nodes represent smart alarm actual, start and end

                    Please don't reply, this is an unmonitored mailbox
                    `

@Component({
    moduleId: module.id,
    selector: 'morphuez-view',
    providers: [Csv2JsonService, FirebaseService],
    template: `
            <div> 
            <p>Test</p> 
            <button (click)="getUserData()">Get User Data</button>
            <div class="container" id="response">Response: {{response}}</div>
            <button (click)="getJSOnUserData()">Get User Data1</button>
            </div>`,
    styleUrls: [ 'login.component.css' ]
})
 
export class MorpheuzReprComponent implements OnInit {
    response: string;
    
    constructor(
        private csv2json:Csv2JsonService, private firebaseService: FirebaseService) {}

    ngOnInit(): void {
        var json: String;
        var response: String;
        json = this.csv2json.parseCsv2Json("Morpheuz-2016-10-29",exampleEMail);
        this.firebaseService.setUserData("18",json);
        this.firebaseService.setUserData("18",json).subscribe(
            resp => response = JSON.stringify(resp),
            error => console.log(error));
        console.log(response);
    }

    getUserData(){
        this.firebaseService.getUserData("18").subscribe(
            resp => this.response = JSON.stringify(resp),
            error => console.log(error)
        );
    }

    getJSOnUserData(){
        var json = JSON.parse(this.response);
        console.log(json["2016-10-29"]);
    }

 
}