import { Component, OnInit, Input } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { PublicReservation } from '../reservations/public-reservation.model';
import { ReservationService } from '../reservation.service';
import { PrivateReservation } from '../reservations/private-reservation.model';

enum TimeslotStatus {
  Booked = 'booked',
  Pending = 'pending',
  Available = 'available'
};

export interface Timeslot {
  timeslot: string;
  status: TimeslotStatus;
  booked_by?: string;
}

const ALL_TIMESLOTS = [
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

@Component({
  selector: 'app-reserve-table',
  template: `
    <div class="form-group">
      <label class="form-label">Date</label> {{ selected_date | json }}
      <app-date-picker [(selectedDate)]="selected_date" (selectedDateChange)="refreshList()"></app-date-picker>
    </div>

    <div class="form-group">
      <label class="form-label">Court to reserve</label>

      <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic" [(ngModel)]="selected_court" (ngModelChange)="refreshList()">
        <label ngbButtonLabel class="btn-outline-primary" *ngFor="let court of courts; let i = index">
          <input ngbButton type="radio" [value]="i"> {{ court }}
        </label>
      </div>
    </div>

    <table class="table table-sm table-responsive">
      <tbody>
        <tr *ngFor="let slot of timeslots">
          <td>
            <!-- check if already reserved, show as booked -->
            <button class="btn btn-outline-primary" (click)="reserve(selected_date, selected_court, slot)" *ngIf="slot.status === TimeslotStatus.Available">
              {{ slot.timeslot }} - Reserve Timeslot
            </button>

            <button class="btn btn-outline-secondary" disabled  *ngIf="slot.status === TimeslotStatus.Booked">
              {{ slot.timeslot }} - Reserved for {{ slot.booked_by }}
            </button>

            <button class="btn btn-secondary" disabled  *ngIf="slot.status === TimeslotStatus.Pending">
              {{ slot.timeslot }} - Reservation Pending for {{ slot.booked_by }}
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
  @Input() reservations: PublicReservation[] = [];
  timeslots: Timeslot[] = [];
  public TimeslotStatus = TimeslotStatus;

  selected_date = moment().utc().startOf('day');
  selected_court = 0;

  courts = ['#1', '#2', '#3', '#4', '#5', '#6'];

  constructor(public i18n: NgbDatepickerI18n, private ReservationService: ReservationService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.refreshList();
  }

  refreshList() {
    const reservations = this.reservations.filter((r: PublicReservation) => {
      return r.date.isSame(this.selected_date) && r.court === this.courts[this.selected_court];
    });

    this.timeslots = ALL_TIMESLOTS.map((t: string) => {
      const [ existing_reservation ] = reservations.filter((r: PublicReservation) => r.timeslot === t);
      if (existing_reservation) {
        if (existing_reservation.confirmed) {
          return {
            timeslot: t,
            status: TimeslotStatus.Booked,
            booked_by: existing_reservation.booked_by
          };
        } else {
          return {
            timeslot: t,
            status: TimeslotStatus.Pending,
            booked_by: existing_reservation.booked_by
          };
        }
      }

      return {
        timeslot: t,
        status: TimeslotStatus.Available
      };
    });
  }

  reserve(selected_date, selected_court_index, slot: Timeslot) {
    this.ReservationService.createReservation(new PrivateReservation({
      date: selected_date,
      court: this.courts[selected_court_index],
      timeslot: slot.timeslot,
      booked_by: {
        first_name: 'Kevin',
        last_name: 'McKillop',
        email: 'kbm@kbmonline.uni.cc'
      }
    })).then(xs => console.log(xs), (err) => console.error(err));
  }

  isAvailable(selected_date, selected_court_index, timeslot) {
    return !this.isBooked(selected_date, selected_court_index, timeslot);
  }

  isBooked(selected_date, selected_court_index, timeslot) {
    const [ booked_by ] = this.reservations.filter((r: PublicReservation) => {
      console.log(r.date.isSame(selected_date));
      return r.date.isSame(selected_date) && r.court === this.courts[selected_court_index] && r.timeslot === timeslot;
    }).map((r: PublicReservation) => r.booked_by);

    return booked_by;
  }

  isPending(selected_date, selected_court_index, timeslot) {
    const [ reservation ] = this.reservations.filter((r: PublicReservation) => {
      return r.date.isSame(selected_date) && r.court === this.courts[selected_court_index] && r.timeslot === timeslot;
    });

    if (reservation) {
      return !reservation.confirmed;
    }

    return false;
  }

}
