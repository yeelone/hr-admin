import { Component, OnInit } from '@angular/core';
import config from '../../../config/config';
const baseurl = config.baseurl;
@Component({
  selector: 'app-nagivator',
  templateUrl: './nagivator.component.html',
  styleUrls: ['./nagivator.component.scss']
})
export class NagivatorComponent implements OnInit {
  isCollapsed = false;
  
  logo = baseurl + "/api/static/img/icon.png"

  constructor() { }

  ngOnInit() {
  }
  

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
