import { Component , OnInit} from '@angular/core';
import config from './config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  version = '';

  ngOnInit() {
    this.version = config.version;
    console.log('Power by Jiangyilong 2018 Version ' + this.version);
  }
}
