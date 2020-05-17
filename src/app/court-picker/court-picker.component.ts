import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-court-picker',
  template: `
    <div class="content">
      <div class="box">
        <div class="court" [ngClass]="{ 'court--selected': court === selectedCourt }" *ngFor="let court of courts" (click)="pickCourt(court)">
          <h6>Court</h6>
          <h2>{{court }}</h2>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .content {
      flex: 1;
      display: flex;
      overflow: auto;
      padding: 0px 8px;
    }

    .content::-webkit-scrollbar {
      display: none;
    }

    .box {
      display: flex;
      min-height: min-content; /* needs vendor prefixes */
    }

    .court {
      cursor: pointer;
      border-radius: 8px;
      padding: 8px 12px;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 6px;
      border: 1px solid #ccc;
    }

    .court--selected {
      background: #007bff;
      border: 1px solid #111188;
    }

    .court--selected h2, .court--selected h6 {
      color: #fff;
    }

    .court h6 {
      text-transform: uppercase;
      font-size: 14px;
      font-weight: bold;
    }

    .court h2 {
      font-size: 28px;
      font-weight: bold;
    }

    .court h2, .court h6 {
      margin: 0;
      padding: 0;
    }
  `]
})
export class CourtPickerComponent implements OnInit {
  @Input() selectedCourt: string;
  @Input() courts: string[];
  @Output() selectedCourtChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  pickCourt(court: string) {
    this.selectedCourtChange.emit(court);
  }

}
