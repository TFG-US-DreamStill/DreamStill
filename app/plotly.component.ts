import { Component, EventEmitter, Input, Output, OnInit, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
 
declare var Plotly: any;
 
@Component({
    moduleId: module.id,
    selector: 'plotlychart',
    template: `
        <div style="margin-bottom:100px;">
            <div id="myPlotlyDiv"
                name="myPlotlyDiv"
                style="width: 1800px; height: 400px; margin: 0 auto;">
                <!-- Plotly chart will be drawn inside this DIV -->
            </div>
        </div>
        
        <div *ngIf="displayRawData">
            raw data:
            <hr />
            <span>{{data | json}}</span>
            <hr />
            layout:
            <hr />
            <span>{{layout | json}}</span>
            <hr />
        </div>

        <div style="margin-bottom:100px;">
            <div id="myPlotlyDiv1"
                name="myPlotlyDiv1"
                style="width: 1800px; height: 400px; margin: 0 auto;">
                <!-- Plotly chart will be drawn inside this DIV -->
            </div>
        </div>
        
        <div *ngIf="displayRawData1">
            raw data:
            <hr />
            <span>{{data1 | json}}</span>
            <hr />
            layout:
            <hr />
            <span>{{layout1 | json}}</span>
            <hr />
        </div>
    `/*,
  styleUrls: ['plotly.component.css']*/
})
 
export class PlotlyComponent implements OnInit {
 
    @Input() data: any;
    @Input() data1: any;
    @Input() layout: any;
    @Input() layout1: any;
    @Input() options: any;
    @Input() options1: any;
    @Input() displayRawData: boolean;
    @Input() displayRawData1: boolean;
 
    ngOnInit() {
        /*console.log("ngOnInit PlotlyComponent");
        console.log(this.data);
        console.log(this.layout);*/
 
        Plotly.newPlot('myPlotlyDiv', this.data, this.layout, this.options);
        Plotly.newPlot('myPlotlyDiv1', this.data1, this.layout1, this.options1);
    }
}