import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({moduleId: module.id, 
            selector: 'morpheuz', 
            templateUrl: 'morpheuz.component.html', 
            styleUrls: ['morpheuz.component.css']})

export class MorpheuzComponent{
    morpheuzID: String;
    constructor(private _http : Http) {
        _http
            .get('/getLoggedUser')
            .map(res => res.json())
            .subscribe((data) => {
                this.morpheuzID = data["morpheuzID"];
                console.log(this.morpheuzID);
            }/*, err => console.log(err), () => console.log('done')*/);
    }
}