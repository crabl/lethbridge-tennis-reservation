import * as moment from 'moment';

export interface IPublicReservation {
  date: string;
  timeslot: string;
  court: string;
  booked_by: string;
  confirmed: boolean;
}

export class PublicReservation {
  readonly date: moment.Moment;
  readonly timeslot: string;
  readonly court: string;
  readonly booked_by: string;
  readonly confirmed: boolean;

  constructor(reservation: IPublicReservation) {
    this.date = moment(reservation.date).utc().startOf('day');
    this.timeslot = reservation.timeslot;
    this.court = reservation.court;
    this.booked_by = reservation.booked_by;
    this.confirmed = reservation.confirmed;
  }
}
