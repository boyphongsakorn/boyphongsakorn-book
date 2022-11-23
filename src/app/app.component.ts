import { Component, LOCALE_ID } from '@angular/core';
import {FormControl,ReactiveFormsModule} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule,MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
const moment = _moment;

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    let result = date.toDateString();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() + 543;

    let shortThaiMonth = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    let fullThaiMonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    switch (displayFormat) {
      case 'DD/MM/YYYY':
        result = `${day} ${fullThaiMonth[month - 1]} ${year}`;
        break;
      default:
      case 'MMM YYYY': {
        result = `${shortThaiMonth[month - 1]} ${year}`;
        break;
      }
    }
    return result;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    //{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    //{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    //{ provide: MAT_DATE_LOCALE, useValue: "th" }
    { provide: MAT_DATE_LOCALE, useValue: 'TH' },
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class AppComponent {
  title = 'book';
  date = new FormControl(new Date());
  weekdays = false;
  todayDate:Date = new Date();
  time = "12:00";
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    if(d?.getMonth() === 10 && d?.getDate() >= 26){
      return false;
    }
    if(d?.getMonth() === 11 && d?.getDate() < 4){
      return false;
    }
    // Prevent weekdays from being selected.
    //if(day === 0 || day === 6){
      return true;
      //display none mat-chip-listbox
    //}
    //return day === 0 || day === 6;
  };
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    //this.events.push(`${type}: ${event.value}`);
    console.log(event.value);
    if(event.value?.getDay() !== 0 && event.value?.getDay() !== 6){
      this.weekdays = true;
    }else{
      this.weekdays = false;
    }
  }
  getValue(wow:any){
    this.time = wow;
    console.log(wow);
  }
  sumbit(){
    console.log(this.date.value);
    console.log(this.time);
  }
}
