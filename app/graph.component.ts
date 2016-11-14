import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable }  from 'rxjs/Observable';

import { PlotlyComponent } from './plotly.component';
import { FirebaseService }   from './firebase.service';

@Component({
  moduleId: module.id,
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  //styleUrls: ['./region.component.css']
  providers: [FirebaseService]
})

export class GraphComponent implements OnInit   {
    response: String[];

    getUserData(){
        this.firebaseService.getUserData("18").subscribe(
            resp => this.response = resp["2016-10-29"],
            error => console.log(error)
        );
    } 
    
    private id: number;
    public message: string;
    private sub: any;
    public dreamDataX: String[];
    public dreamDataY: String[];
    private name: string;
    public PlotlyLayout: any;
    public PlotlyData: any;
    public PlotlyOptions: any;

    constructor(private firebaseService: FirebaseService) {}


	ngOnInit() {     

        this.getGetRegionBarChartData();

    }

    private getGetRegionBarChartData() {
        console.log('GraphComponent:getData starting...');
        this.firebaseService.getUserData("18").subscribe(
            resp => this.setReturnedData(resp["2016-10-29"]),
            error => console.log(error));
        /*this._snakeDataService
            .GetRegionBarChartData(this.name)
            .subscribe(data => this.setReturnedData(data),
            error => console.log(error),
            () => console.log('Get GeographicalCountries completed for region'));*/
    }

    private setReturnedData(data: any) {
        console.log(data);
        this.dreamDataX = [];
        this.dreamDataY = [];
        for (let d of data){
            console.log("d:"+d);
            this.dreamDataX.push(d.Hour);
            this.dreamDataY.push(d.Movements);
        }
        /*for (let d in data){
            this.dreamDataY.push(d.Movements);
        }*/
        this.PlotlyLayout = {
            title: "Numero de movimientos",
            height: 500,
            width: 1800
        };

        this.PlotlyData = [
            {
                x: this.dreamDataX,
                y: this.dreamDataY,
                name: "Number of snake bite deaths",
                type: 'scatter', // set the chart type
                mode: 'lines' // connect points with lines
            }
        ];

        console.log("recieved plotly data");
        console.log(this.PlotlyData);
    }
}