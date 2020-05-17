import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReserveTableComponent } from './reserve-table/reserve-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ReservationService } from './reservation.service';
import { ReserveModalComponent } from './reserve-modal/reserve-modal.component';
import { CourtPickerComponent } from './court-picker/court-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ReserveTableComponent,
    DatePickerComponent,
    ReserveModalComponent,
    CourtPickerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
