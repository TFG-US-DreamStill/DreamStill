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

    constructor(private _firebaseService: FirebaseService, private route: ActivatedRoute) { }

     ngOnInit(): void {
        this.route.queryParams.forEach((params: Params) => {
            if (params['app'] !== undefined && params['id'] !== undefined && params['date'] !== undefined) {
                if (params['app'] === 'morpheuz'){
                    this._firebaseService.getMorpheuzDataOfUserAtDate(params['id'],new Date(params['date'])).subscribe(
                                                                        info => console.log(JSON.stringify(info)),
                                                                        error => console.log(error))
                }
                /*let id = +params['id'];
                this.navigated = true;
                this.heroService.getHero(id)
                    .then(hero => this.hero = hero);*/ 
            } else {
               /* this.navigated = false; 
                this.hero = new Hero();*/
            }
        });
  }
}