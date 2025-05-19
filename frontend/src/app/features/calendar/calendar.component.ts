import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarModule,
  CalendarView,
  CalendarEvent,
  DateAdapter,
  CalendarDateFormatter,
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule
  ],
    providers: [
    { provide: DateAdapter, useFactory: adapterFactory },  
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter }
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  locale = 'fr';
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Affiché dans la case du jour',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
    },
  ];

  previous(): void {
    this.changeDate(-1);
  }

  next(): void {
    this.changeDate(1);
  }

    private changeDate(direction: number) {
    if (this.view === CalendarView.Month) {
      this.viewDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth() + direction,
        1
      );
    } else if (this.view === CalendarView.Week) {
      this.viewDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth(),
        this.viewDate.getDate() + direction * 7
      );
    } else {
      this.viewDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth(),
        this.viewDate.getDate() + direction
      );
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }
}
