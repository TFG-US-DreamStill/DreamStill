import { Component, OnInit } from '@angular/core';
import { Csv2JsonService } from './csv2json.service';
 
@Component({
    moduleId: module.id,
    selector: 'morphuez-view',
    providers: [Csv2JsonService],
    template: `<div> <p>Test</p> </div>`,
    styleUrls: [ 'login.component.css' ]
})
 
export class MorpheuzReprComponent implements OnInit {
    
    constructor(
        private csv2json:Csv2JsonService) {}

    ngOnInit(): void {
        this.csv2json.parseCsv2Json();
    }
 
}