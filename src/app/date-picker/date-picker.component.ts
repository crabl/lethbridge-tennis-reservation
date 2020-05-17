import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

const TODAY = moment().utc().startOf('day');

@Component({
  selector: 'app-date-picker',
  template: `
    <div class="content">
      <div class="box">
        <div class="date" [ngClass]="{ 'date--selected': date.isSame(selectedDate) }" *ngFor="let date of dates" (click)="pickDate(date)">
          <h6>{{date | date:'LLL':'UTC' }}</h6>
          <h2>{{date | date:'dd':'UTC' }}</h2>
          <h6>{{date | date:'E':'UTC' }}</h6>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .content {
      flex: 1;
      display: flex;
      overflow: auto;
      padding: 0px 8px;
    }

    .content::-webkit-scrollbar {
      display: none;
    }

    .box {
      display: flex;
      min-height: min-content; /* needs vendor prefixes */
    }

    .date {
      cursor: pointer;
      border-radius: 8px;
      padding: 8px 20px;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 6px;
      border: 1px solid #ccc;
    }

    .date--selected {
      background: #007bff;
      border: 1px solid #111188;
    }

    .date--selected h2, .date--selected h6 {
      color: #fff;
    }

    .date h6 {
      text-transform: uppercase;
      font-size: 14px;
      font-weight: bold;
    }

    .date h2 {
      font-size: 28px;
      font-weight: bold;
    }

    .date h2, .date h6 {
      margin: 0;
      padding: 0;
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
