import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

const TODAY = moment().startOf('day');

@Component({
  selector: 'app-date-picker',
  template: `
    <div class="content">
      <div class="box">
        <div class="card--date" *ngFor="let date of dates">
          {{date | date:'E'}}
          {{date | date:'LLL'}}
          {{date | date:'dd'}}
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
  @Input() selectedDate: moment.Moment = moment(TODAY);
  @Output() selectedDateChange = new EventEmitter<moment.Moment>();

  @Input() maxDate: moment.Moment = moment(TODAY).add(7, 'days');

  dates: moment.Moment[] = []


  allow_previous: boolean = true;
  allow_next: boolean = true;

  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
    this.dates = [
      moment(TODAY).add(0, 'days'),
      moment(TODAY).add(1, 'days'),
      moment(TODAY).add(2, 'days'),
      moment(TODAY).add(3, 'days'),
      moment(TODAY).add(4, 'days'),
      moment(TODAY).add(5, 'days'),
      moment(TODAY).add(6, 'days'),
      moment(TODAY).add(7, 'days')
    ]
  }

  ngOnChanges() {
    this.allow_previous = this.selectedDate.isAfter(TODAY, 'day');
    this.allow_next = this.selectedDate.isBefore(this.maxDate);
  }

  previousDate() {
    this.selectedDateChange.emit(moment(this.selectedDate).subtract(1, 'days'));
  }

  nextDate() {
    this.selectedDateChange.emit(moment(this.selectedDate).add(1, 'days'));
  }

}
