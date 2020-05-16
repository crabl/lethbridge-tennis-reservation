import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { IPublicReservation, PublicReservation } from './reservations/public-reservation.model';
import { map, catchError } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { PrivateReservation } from './reservations/private-reservation.model';

const API_ROOT = 'https://crabl-lethbridge-tennis.builtwithdark.com';

@Injectable()
export class ReservationService {

  constructor(private HttpClient: HttpClient) { }

  getReservations() {
    const from = moment().utc().startOf('day').toISOString();
    return this.HttpClient
      .get(API_ROOT + '/reservations?from=' + from)
      .pipe(map((reservations: IPublicReservation[]) => reservations.map((r: IPublicReservation) => new PublicReservation(r))))
      .pipe(catchError(err => observableOf([] as PublicReservation[])));
  }

  createReservation(r: PrivateReservation) {
    return this.HttpClient.post(API_ROOT + '/reservations', r.serialize());
  }
}
