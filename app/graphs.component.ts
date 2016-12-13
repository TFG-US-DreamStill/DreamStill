import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { FirebaseService }          from './firebase.service';

@Component({
    moduleId: module.id,
    selector: 'selector',
    templateUrl: 'graphs.component.html'
})
export class GraphsComponent implements OnInit {
    datos: JSON;
    public message: string;
    private sub: any;
    public dreamDataX: String[];
    public dreamDataY: String[];
    private name: string;
    public PlotlyLayout: any;
    public PlotlyData: any;
    public PlotlyOptions: any;

    constructor(private _firebaseService: FirebaseService, private route: ActivatedRoute) { }

     ngOnInit(): void {
        this.route.queryParams.forEach((params: Params) => {
            if (params['app'] !== undefined && params['date'] !== undefined) {
                if (params['app'] === 'morpheuz'){
                    this._firebaseService.getMorpheuzDataOfUserAtDate(new Date(params['date'])).subscribe(
                                                                        data => this.setReturnedData(data),
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