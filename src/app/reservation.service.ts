import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { IPublicReservation, PublicReservation } from './reservations/public-reservation.model';
import { map, catchError } from 'rxjs/operators';
import { of as observableOf, BehaviorSubject } from 'rxjs';
import { PrivateReservation } from './reservations/private-reservation.model';

const API_ROOT = 'https://crabl-lethbridge-tennis.builtwithdark.com';

@Injectable()
export class ReservationService {
  reservations$ = new BehaviorSubject<PublicReservation[]>([]);

  constructor(private HttpClient: HttpClient) { }

  getReservations() {
    const from = moment().utc().startOf('day').toISOString();
    return this.HttpClient
      .get(API_ROOT + '/reservations?from=' + from)
      .pipe(map((reservations: IPublicReservation[]) => reservations.map((r: IPublicReservation) => new PublicReservation(r))))
      .pipe(catchError(err => observableOf([] as PublicReservation[])))
      .toPromise()
      .then((rs: PublicReservation[]) => {
        this.reservations$.next(rs);
      });
  }

  async createReservation(r: PrivateReservation) {
    try {
      const reservation = await this.HttpClient.post(API_ROOT + '/reservations', r.serialize()).toPromise();
      this.getReservations();
      return reservation;
    } catch (err) {
      this.getReservations();
      throw err.error ? err.error.error : 'We ran into an issue creating your booking. Please try again later.';
    }
  }
}
