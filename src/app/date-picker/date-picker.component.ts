import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

const TODAY = moment().utc().startOf('day');

@Component({
  selector: 'app-date-picker',
  template: `
    <div class="content">
      <div class="box">
        <div class="card--date" *ngFor="let date of dates" (click)="pickDate(date)">
          {{date | date:'E':'UTC' }}
          {{date | date:'LLL':'UTC' }}
          {{date | date:'dd':'UTC' }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .content {
      flex: 1;
      display: flex;
      overflow: auto;
    }

    .box {
      display: flex;
      min-height: min-content; /* needs vendor prefixes */
    }

    .card--date {
      width: 100px !important;
    }
  `]
})
export class DatePickerComponent implements OnInit {
  @Input() selectedDate: moment.Moment = moment(TODAY).utc().startOf('day');
  @Output() selectedDateChange = new EventEmitter<moment.Moment>();

  @Input() maxDate: moment.Moment = moment(TODAY).utc().startOf('day').add(7, 'days');

  dates: moment.Moment[] = []


  allow_previous: boolean = true;
  allow_next: boolean = true;

  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
    this.dates = [
      moment(TODAY).utc().startOf('day').add(0, 'days'),
      moment(TODAY).utc().startOf('day').add(1, 'days'),
      moment(TODAY).utc().startOf('day').add(2, 'days'),
      moment(TODAY).utc().startOf('day').add(3, 'days'),
      moment(TODAY).utc().startOf('day').add(4, 'days'),
      moment(TODAY).utc().startOf('day').add(5, 'days'),
      moment(TODAY).utc().startOf('day').add(6, 'days'),
      moment(TODAY).utc().startOf('day').add(7, 'days')
    ]
  }

  ngOnChanges() {
    this.allow_previous = this.selectedDate.isAfter(TODAY, 'day');
    this.allow_next = this.selectedDate.isBefore(this.maxDate);
  }

  pickDate(date: moment.Moment) {
    this.selectedDateChange.emit(moment(date).utc().startOf('day'));
  }

}
