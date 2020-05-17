import { Component, OnInit, Input } from '@angular/core';
import { NgbDatepickerI18n, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { PublicReservation } from '../reservations/public-reservation.model';
import { ReserveModalComponent } from '../reserve-modal/reserve-modal.component';

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
        <app-date-picker [(selectedDate)]="selected_date" (selectedDateChange)="refreshList()"></app-date-picker>
      </div>

      <div class="form-group">
        <app-court-picker [(selectedCourt)]="selected_court" (selectedCourtChange)="refreshList()" [courts]="courts"></app-court-picker>
      </div>

    <div class="timeslots">
      <ng-container *ngFor="let slot of timeslots">
        <!-- check if already reserved, show as booked -->
        <div class="timeslot" *ngIf="slot.status === TimeslotStatus.Available" (click)="reserve(selected_date, selected_court, slot)">
          <div class="time">{{ slot.timeslot }}</div> <button class="btn btn-secondary">Request</button>
        </div>

        <div class="timeslot" disabled  *ngIf="slot.status === TimeslotStatus.Booked">
          <div class="time">{{ slot.timeslot }}</div> <span class="badge badge-pill badge-success">Reserved for {{ slot.booked_by | uppercase }}</span>
        </div>

        <div class="timeslot" disabled  *ngIf="slot.status === TimeslotStatus.Pending">
          <div class="time">{{ slot.timeslot }}</div> <span class="badge badge-pill badge-warning">Reservation pending for {{ slot.booked_by | uppercase }}</span>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .navbar-brand {
      text-align: center;
    }

    .timeslots {
      background: #fafafa;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin: 8px;
    }

    .timeslot:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .timeslot:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .timeslot {
      min-height: 64px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 12px;
    }

    .timeslot .time {
      flex: 1;
      text-align: left;
      font-weight: 600;
    }
  `]
})
export class ReserveTableComponent implements OnInit {
  @Input() reservations: PublicReservation[] = [];
  timeslots: Timeslot[] = [];
  public TimeslotStatus = TimeslotStatus;

  selected_date = moment().utc().startOf('day');
  selected_court = '#1';

  courts = ['#1', '#2', '#3', '#4', '#5', '#6'];

  constructor(public i18n: NgbDatepickerI18n, private NgbModal: NgbModal) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.refreshList();
  }

  refreshList() {
    const reservations = this.reservations.filter((r: PublicReservation) => {
      return r.date.isSame(this.selected_date) && r.court === this.selected_court;
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

  reserve(selected_date, selected_court, slot: Timeslot) {
    const modal_ref = this.NgbModal.open(ReserveModalComponent);
    modal_ref.componentInstance.date = selected_date;
    modal_ref.componentInstance.court = selected_court;
    modal_ref.componentInstance.timeslot = slot.timeslot;
  }

  isAvailable(selected_date, selected_court, timeslot) {
    return !this.isBooked(selected_date, selected_court, timeslot);
  }

  isBooked(selected_date, selected_court, timeslot) {
    const [ booked_by ] = this.reservations.filter((r: PublicReservation) => {
      console.log(r.date.isSame(selected_date));
      return r.date.isSame(selected_date) && r.court === selected_court && r.timeslot === timeslot;
    }).map((r: PublicReservation) => r.booked_by);

    return booked_by;
  }

  isPending(selected_date, selected_court, timeslot) {
    const [ reservation ] = this.reservations.filter((r: PublicReservation) => {
      return r.date.isSame(selected_date) && r.court === selected_court && r.timeslot === timeslot;
    });

    if (reservation) {
      return !reservation.confirmed;
    }

    return false;
  }

}
