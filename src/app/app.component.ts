import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicReservation } from './reservations/public-reservation.model';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="app-container">
      <h4 class="w-auto text-center" style="margin: 12px 0px;">Reserve a Tennis Court</h4>

      <app-reserve-table [reservations]="reservations$ | async"></app-reserve-table>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 650px;
      width: 100%;
      margin: 0px auto 10px auto;
    }
  `]
})
export class AppComponent {
  title = 'lethbridge-tennis-reservation';
  reservations$: Observable<PublicReservation[]>;

  constructor(private ReservationService: ReservationService) {
    this.reservations$ = this.ReservationService.reservations$;
    this.ReservationService.getReservations();
  }
}
