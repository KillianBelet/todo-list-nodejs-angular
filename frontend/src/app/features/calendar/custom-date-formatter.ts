import { Injectable } from '@angular/core';
import {
  CalendarDateFormatter,
  DateFormatterParams,
} from 'angular-calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  override weekViewHour({ date }: DateFormatterParams): string {
    return format(date, 'HH:mm', { locale: fr });
  }


  override dayViewHour({ date }: DateFormatterParams): string {
    return format(date, 'HH:mm', { locale: fr });
  }
}
