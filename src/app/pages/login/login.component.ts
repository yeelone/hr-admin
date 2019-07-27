import { Component } from '@angular/core';
import config from '../../config/config';

const baseurl = config.baseurl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   chrome = baseurl + "/api/static/img/chrome.png";
   icon = baseurl + "/api/static/img/icon-min.png";
}
