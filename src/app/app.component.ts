import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicReservation } from './reservations/public-reservation.model';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <app-reserve-table [reservations]="reservations$ | async"></app-reserve-table>
  `,
  styles: []
})
export class AppComponent {
  title = 'lethbridge-tennis-reservation';
  reservations$: Observable<PublicReservation[]>;

  constructor(private ReservationService: ReservationService) {
    this.reservations$ = this.ReservationService.reservations$;
    this.ReservationService.getReservations();
  }
}
