import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { FirebaseService }          from './firebase.service';

@Component({
    moduleId: module.id,
    selector: 'selector',
    templateUrl: 'graphs.component.html'
})
export class GraphsComponent implements OnInit {
    public dreamDataX: String[];
    public dreamDataY: String[];
    public sleepStates: String[];
    public sleepDataStates: number[];
    public PlotlyLayout: any;
    public PlotlyData: any;
    public PlotlyOptions: any;
    public PlotlyLayoutPie: any;
    public PlotlyDataPie: any;
    public PlotlyOptionsPie: any;

    constructor(private _firebaseService: FirebaseService, private route: ActivatedRoute) { }

     ngOnInit(): void {
        this.route.queryParams.forEach((params: Params) => {
            if (params['app'] !== undefined && params['date'] !== undefined) {
                if (params['app'] === 'morpheuz'){
                    this._firebaseService.getMorpheuzDataOfUserAtDate(new Date(params['date'])).subscribe(
                                                                        data => this.setReturnedData(data),
                                                                        error => console.log(error))
                }
                if (params['app'] === 'fitbit'){
                    this._firebaseService.getFitbitDataOfUserAtDate(new Date(params['date'])).subscribe(
                                                                        data => this.setReturnedDataFitbit(data),
                                                                        error => console.log(error))
                }
            } else {
               /* this.navigated = false; 
                this.hero = new Hero();*/
            }
        });
     }

    private setReturnedData(data: any) {
        console.log(data);
        this.dreamDataX = [];
        this.dreamDataY = [];
        this.sleepStates = ["Inquieto","Ligero","Profundo","Ignorar"];
        this.sleepDataStates = [0, 0, 0, 0];
        for (let d of data){
            //console.log("d:"+d);
            if(d.Movements!=='-1' && d.Movements!=='-2'){
                this.dreamDataX.push(d.Hour);
                this.dreamDataY.push(d.Movements);
                //console.log("movimientos:"+parseInt(d.Movents)+"/"+d.Movements);
                if(d.Movements > 1000){
                    this.sleepDataStates[0] = this.sleepDataStates[0]+1;
                }else if(d.Movements <= 120){
                    this.sleepDataStates[2] = this.sleepDataStates[2]+1;
                }else{
                    this.sleepDataStates[1] = this.sleepDataStates[1]+1;
                }
            }
            if(d.Movements==='-2'){
                   this.sleepDataStates[3] = this.sleepDataStates[0]+1; 
            }
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
                name: "Number of movements",
                type: 'scatter', // set the chart type
                mode: 'lines' // connect points with lines
            }
        ];

        this.PlotlyLayoutPie = {
            title: "Calidad del sueño",
            height: 500,
            width: 1800
        };

        this.PlotlyDataPie = [
            {
                labels: this.sleepStates,
                values: this.sleepDataStates,
                name: "Sleep Quality",
                type: 'pie',
                marker: {'colors': ['rgb(144,123,210)',
                                    'rgb(121,85,212)',
                                    'rgb(92,60,171)',
                                    'rgb(246,243,251)']},
            }
        ];

        //console.log("recieved plotly data");
        //console.log(this.PlotlyData);
  }

  private setReturnedDataFitbit(data: any) {
        console.log(data);
        this.dreamDataX = [];
        this.dreamDataY = [];
        this.sleepStates = ["Inquieto","Ligero","Profundo"];
        this.sleepDataStates = [0, 0, 0];
        for (let d of data){
            //console.log("d:"+d);
            this.dreamDataX.push(d.Hour);
            this.dreamDataY.push(d.Movements);
            //console.log("movimientos:"+parseInt(d.Movents)+"/"+d.Movements);
            if(d.Movements == 3){
                this.sleepDataStates[0] = this.sleepDataStates[0]+1;
            }else if(d.Movements == 2){
                this.sleepDataStates[1] = this.sleepDataStates[1]+1;
            }else{
                this.sleepDataStates[2] = this.sleepDataStates[2]+1;
            }
        }
        /*for (let d in data){
            this.dreamDataY.push(d.Movements);
        }*/
        this.PlotlyLayout = {
            title: "Nivel de actividad",
            height: 500,
            width: 1800
        };

        this.PlotlyData = [
            {
                x: this.dreamDataX,
                y: this.dreamDataY,
                name: "Activity level",
                type: 'scatter', // set the chart type
                mode: 'lines' // connect points with lines
            }
        ];

        this.PlotlyLayoutPie = {
            title: "Calidad del sueño",
            height: 500,
            width: 1800
        };

        this.PlotlyDataPie = [
            {
                labels: this.sleepStates,
                values: this.sleepDataStates,
                name: "Sleep Quality",
                type: 'pie',
                marker: {'colors': ['rgb(144,123,210)',
                                    'rgb(121,85,212)',
                                    'rgb(92,60,171)',
                                    'rgb(246,243,251)']},
            }
        ];

        //console.log("recieved plotly data");
        //console.log(this.PlotlyData);
  }
}