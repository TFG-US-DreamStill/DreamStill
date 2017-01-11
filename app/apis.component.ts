import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Http }         from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'apis',
    styleUrls: ['apis.component.css'],
    templateUrl: 'apis.component.html'
    
})
export class ApisComponent implements OnInit {
    router: Router;
    pattern: RegExp;

    constructor(private _router: Router, private _http: Http) {
        this.router = _router;
        this.pattern = /access_token=(.*)&user_id/g;
    }

    ngOnInit() {
            if (this.router.url.includes("#")){
                //this.pattern = /access_token=(.*)&user_id/g;
                var access_token = this.pattern.exec(this.router.url)[1];
                window.location.href = 'getAuthToFitbit?access_token='+access_token;
            }
     }
}