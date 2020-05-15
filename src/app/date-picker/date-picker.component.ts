import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

const TODAY = moment().startOf('day');

@Component({
  selector: 'app-date-picker',
  template: `
    <div class="btn-group">
      <button class="btn btn-outline-primary" [disabled]="!allow_previous" (click)="previousDate()">
        &laquo;
      </button>
      <button class="btn btn-outline-primary">
        {{ selectedDate | date }}
      </button>
      <button class="btn btn-outline-primary" [disabled]="!allow_next" (click)="nextDate()">
        &raquo;
      </button>
    </div>
  `,
  styles: [
  ]
})
export class DatePickerComponent implements OnInit {
  @Input() selectedDate: moment.Moment = moment(TODAY);
  @Output() selectedDateChange = new EventEmitter<moment.Moment>();

  @Input() maxDate: moment.Moment = moment(TODAY).add(7, 'days');

  allow_previous: boolean = true;
  allow_next: boolean = true;

  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
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
