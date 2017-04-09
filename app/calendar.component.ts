import { Component, OnInit } from '@angular/core';
import {
  //startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths/*,
  addHours*/
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
}                  from 'angular-calendar';
import { FirebaseService }  from './firebase.service';
import { Http }         from '@angular/http';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  lightblue: {
    primary: '#add8e6',
    secondary: '#E2F1FF'
  }
};

@Component({
    moduleId: module.id,
    selector: 'calendar',
    styleUrls: ['calendar.component.css'],
    templateUrl: 'calendar.component.html',
})
export class CalendarComponent implements OnInit {
    view: string = 'month';
    viewDate: Date = new Date();
    events: CalendarEvent[] = [];
    user: JSON;
    info: JSON;
    infoFitbit: JSON;
    constructor(private _firebaseService: FirebaseService, private _http: Http) {
         _http.get('/getLoggedUser')
                  .map(res => res.json())
                  .subscribe(
                     (data) => {
                       this.user=data;
                       //console.log(this.user);
                       if(this.user['morpheuzID']!==undefined){
                          this._firebaseService.getMorpheuzDaysWithData().subscribe(
                          info => {
                            this.info = info;
                            this.getInfoOfDays();
                            },
                          //error => console.log(error)
                          ),
                          this._firebaseService.getFitbitDaysWithData().subscribe(
                          info => {
                            this.infoFitbit = info;
                            this.getInfoOfDays();
                            },
                          ///error => console.log(error)
                          )
                       }
                     }/*,
                     err=>console.log(err),
                     ()=>console.log('done')*/
                   );
     }

    ngOnInit() {
     }
    
  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      //console.log('Edit event', event); 
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
    }
  }];

  createEventsMorpheuz(event: JSON): void{
      //console.log(event);
      if(event!==undefined){
        var daysOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth()+1, 0).getDate();
        for (var _i = 1; _i <= daysOfMonth; _i++){
          var date: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), _i)
          var year: String = ""+date.getFullYear();
          var month:string  = ("0" + (date.getMonth()+1)).slice(-2);
          var day: String = ("0" + date.getDate()).slice(-2);
          //console.log(year+"-"+month+"-"+day);
          if(event[year+"-"+month+"-"+day]!==undefined){
              this.events.push({start: date,
                           end: date,
                           title: "<a href=/graphs?app=morpheuz&date="+year+"-"+month+"-"+day+" style='color: white;'> Sueño de Morpheuz </a>",
                           color: colors.blue})
          }
        }
      }
      this.refresh.next();
  }

  createEventsFitbit(event: JSON): void{
      //console.log(event);
      if(event!==undefined){
        var daysOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth()+1, 0).getDate();
        for (var _i = 1; _i <= daysOfMonth; _i++){
          var date: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), _i)
          var year: String = ""+date.getFullYear();
          var month:string  = ("0" + (date.getMonth()+1)).slice(-2);
          var day: String = ("0" + date.getDate()).slice(-2);
          //console.log(year+"-"+month+"-"+day);
          if(event[year+"-"+month+"-"+day]!==undefined){
              this.events.push({start: date,
                           end: date,
                           title: "<a href=/graphs?app=fitbit&date="+year+"-"+month+"-"+day+" style='color: white;'> Sueño de Fitbit </a>",
                           color: colors.lightblue})
          }
        }
      }
      this.refresh.next();
  }

  getInfoOfDays(): void{
      var date: Date;
      //console.log(this.viewDate);
      this.events = [];
      if(this.user['morpheuzID']!==undefined){
        this.createEventsMorpheuz(this.info);
      }
      if(this.user['fitbit']['fitbitID']!==undefined){
        this.createEventsFitbit(this.infoFitbit);
      }
  }

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  increment(): void {

    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDate = addFn(this.viewDate, 1);
    this.getInfoOfDays();
  }

  decrement(): void {

    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDate = subFn(this.viewDate, 1);
    this.getInfoOfDays();
  }

  today(): void {
    this.viewDate = new Date();
    this.getInfoOfDays();
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

}