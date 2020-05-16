import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { PrivateReservation } from '../reservations/private-reservation.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reserve-modal',
  template: `
    <div class="modal-content">

      <div class="modal-body">
        <div class="form-group">
          <label><strong>Timeslot Details</strong></label>
          <button type="button" class="close" aria-label="Close" (click)="dismiss()">
            <span aria-hidden="true">&times;</span>
          </button>

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ date.format('LL') }} <span class="badge badge-pill badge-secondary float-right">Court {{ court }}</span></h5>
              <h6 class="card-subtitle mb-2">{{ timeslot }}</h6>
            </div>
          </div>
        </div>

        <div class="alert alert-danger" *ngIf="error">
          {{ error }}
        </div>

        <div class="form-group">
          <label><strong>First Name</strong></label>
          <input class="form-control" [(ngModel)]="first_name" required />
        </div>

        <div class="form-group">
          <label><strong>Last Name</strong></label>
          <input class="form-control" [(ngModel)]="last_name" required />
        </div>

        <div class="form-group">
          <label><strong>E-mail Address</strong></label>
          <input class="form-control" [(ngModel)]="email" type="email" required />
        </div>

        <div class="form-group">
          <p class="text-left">Once your timeslot request is confirmed, you will receive an e-mail. Please note that only registered Lethbridge Tennis Club members can reserve timeslots through this form. <a href="http://www.tennislethbridge.ca/membership.html">To purchase a membership, click here</a></p>
        <div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-light" (click)="dismiss()">Go Back</button>
        <button class="btn btn-primary" (click)="reserve()" [disabled]="!email || !first_name || !last_name">Request Timeslot</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ReserveModalComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() court: string;
  @Input() timeslot: string;

  first_name: string;
  last_name: string;
  email: string;

  error: string;


  constructor(private ReservationService: ReservationService, private NgbActiveModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.NgbActiveModal.dismiss();
  }

  async reserve() {
    this.ReservationService.createReservation(new PrivateReservation({
      date: this.date,
      court: this.court,
      timeslot: this.timeslot,
      booked_by: {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email
      }
    })).then(_success => {

    }, error => {
      this.error = error;
    });
  }

}
