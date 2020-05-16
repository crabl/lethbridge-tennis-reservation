import * as moment from 'moment';

export interface ClubMember {
  first_name: string;
  last_name: string;
  email: string;
}

export interface IPrivateReservation {
  date: string | moment.Moment;
  timeslot: string;
  court: string;
  booked_by: ClubMember;
}

export class PrivateReservation {
  date: moment.Moment;
  timeslot: string;
  court: string;
  booked_by: ClubMember;

  constructor(reservation: IPrivateReservation) {
    this.date = moment(reservation.date).utc().startOf('day');
    this.timeslot = reservation.timeslot;
    this.court = reservation.court;
    this.booked_by = reservation.booked_by;
  }

  serialize(): IPrivateReservation {
    return {
      date: this.date.toISOString(),
      timeslot: this.timeslot,
      court: this.court,
      booked_by: this.booked_by
    };
  }
}
