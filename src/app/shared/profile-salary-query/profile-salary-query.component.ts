import { Component, OnInit } from '@angular/core';
import moment = require('moment');

@Component({
  selector: 'app-profile-salary-query',
  templateUrl: './profile-salary-query.component.html',
  styleUrls: ['./profile-salary-query.component.css']
})
export class ProfileSalaryQueryComponent implements OnInit {
  selectedMonth: any ;

  constructor() { }

  ngOnInit() {
  }

  query(): void {
    const year = moment(this.selectedMonth).format('YYYY');
    const month = moment(this.selectedMonth).format('MM');

    console.log(year, month );
  }
}
