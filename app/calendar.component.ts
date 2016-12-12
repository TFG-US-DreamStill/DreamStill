import { Component, OnInit } from '@angular/core';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addHours
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
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
    moduleId: module.id,
    selector: 'calendar',
    styleUrls: ['calendar.component.css'],
    templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {
    view: string = 'month';
    viewDate: Date = new Date();
    events: CalendarEvent[] = [{
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red,
    actions: this.actions
  }, {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow,
    actions: this.actions
  }, {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: colors.blue
  }, {
    start: new Date(2016,11,15),
    end: new Date(),
    title: 'Test',
    color: colors.yellow,
    actions: this.actions,
    resizable: {
      beforeStart: true,
      afterEnd: true
    }
  }];
    user: JSON;

    constructor(private _firebaseService: FirebaseService, private _http: Http) {
         _http.get('/getLoggedUser')
                  .map(res => res.json())
                  .subscribe(
                     (data) => {
                       this.user=data;
                       console.log(this.user);
                     },
                     err=>console.log(err),
                     ()=>console.log('done')
                   );
     }

    ngOnInit() {
     }
    
  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      console.log('Edit event', event); 
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
    }
  }];

  createEvents(event: JSON): void{
      console.log(event);
      if(event!==undefined){
        var daysOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth()+1, 0).getDate();
        for (var _i = 1; _i <= daysOfMonth; _i++){
          var date: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), _i)
          var year: String = ""+date.getFullYear();
          var month:string  = String(date.getMonth()+1);
          var day: String = ("0" + date.getDate()).slice(-2);
          if(event[year+"-"+month+"-"+day]!==undefined){
              this.events.push({start: date,
                           end: date,
                           title: 'Sueño de Morpheuz',
                           color: colors.blue,
                           actions: this.actions})
          }
        }
      }
      this.refresh.next();
  }
  getInfoOfDays(): void{
      var date: Date;
      console.log(this.viewDate);
      this.events = [];
      if(this.user["morpheuzID"]!==undefined){
        this._firebaseService.getMorpheuzDaysWithData().subscribe(
            info => this.createEvents(info),
            error => console.log(error)
        )
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