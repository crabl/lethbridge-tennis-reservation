import { Component, OnInit } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-reserve-table',
  template: `
    <div class="form-group">
      <label class="form-label">Date</label> {{ selected_date | json }}
      <app-date-picker [(selectedDate)]="selected_date"></app-date-picker>
    </div>

    <div class="form-group">
      <label class="form-label">Court to reserve</label>

      <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic" [(ngModel)]="selected_court">
        <label ngbButtonLabel class="btn-outline-primary" *ngFor="let court of courts; let i = index">
          <input ngbButton type="radio" [value]="i"> {{ court }}
        </label>
      </div>
    </div>

    <table class="table table-sm table-responsive">
      <tbody>
        <tr *ngFor="let timeslot of timeslots">
          <td>
            <!-- check if already reserved, show as booked -->
            <button class="btn btn-outline-primary" (click)="reserve(selected_date, selected_court, timeslot)" *ngIf="isAvailable(selected_date, selected_court, timeslot)">
              {{ timeslot }} - Reserve Timeslot
            </button>

            <button class="btn btn-outline-secondary" disabled  *ngIf="isBooked(selected_date, selected_court, timeslot)">
              {{ timeslot }} - Booked by CR
            </button>

            <button class="btn btn-secondary" disabled  *ngIf="isPending(selected_date, selected_court, timeslot)">
              {{ timeslot }} - Pending Confirmation
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
  ]
})
export class ReserveTableComponent implements OnInit {
  current_year = new Date().getFullYear();
  current_month = new Date().getMonth();
  current_day = new Date().getDate();

  selected_date = moment().startOf('day');
  selected_court = 0;

  courts = ['#1', '#2', '#3', '#4', '#5', '#6'];

  timeslots = [
    '6:00-6:30 AM',
    '6:30-7:00 AM',
    '7:00-7:30 AM',
    '7:30-8:00 AM',
    '8:00-8:30 AM',
    '8:30-9:00 AM',
    '9:00-9:30 AM',
    '9:30-10:00 AM',
    '10:00-10:30 AM',
    '10:30-11:00 AM',
    '11:00-11:30 AM',
    '11:30-12:00 PM',
    '12:00-12:30 PM',
    '12:30-1:00 PM',
    '1:00-1:30 PM',
    '1:30-2:00 PM',
    '2:00-2:30 PM',
    '2:30-3:00 PM',
    '3:00-3:30 PM',
    '4:00-4:30 PM',
    '4:30-5:00 PM',
    '5:00-5:30 PM',
    '5:30-6:00 PM',
    '6:00-6:30 PM',
    '6:30-7:00 PM',
    '7:00-7:30 PM',
    '7:30-8:00 PM',
    '8:00-8:30 PM',
    '8:30-9:00 PM',
    '9:00-9:30 PM',
    '9:30-10:00 PM',
    '10:00-10:30 PM',
    '10:30-11:00 PM',
    '11:00-11:30 PM'
  ];

  constructor(public i18n: NgbDatepickerI18n) { }

  ngOnInit(): void {
  }

  reserve(selected_date, selected_court_index, timeslot) {
    alert(selected_date + selected_court_index + timeslot)
  }

  isAvailable(selected_date, selected_court, timeslot) {
    return false;
  }

  isBooked(selected_date, selected_court, timeslot) {
    return false;
  }

  isPending(selected_date, selected_court, timeslot) {
    return true;
  }

}
