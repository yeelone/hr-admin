import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/service/health.service';
import { RecordService } from 'src/app/service/record.service';
import { Record } from 'src/app/model/record';
import { SummaryService } from 'src/app/service/summary.service';
import { Summary } from 'src/app/model/summary';
import { Title } from '@angular/platform-browser';
import config from 'src/app/config/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  messages: string[] = [];
  records: Record[] = [];

  // pagination
  pagination = true ;
  defaultLimit = 10;
  pageIndex = 1 ;
  limit = this.defaultLimit ;
  offset = 0;
  total: number ;
  loading = false;
  summary: Summary = new Summary();

  constructor(
    private titleService: Title ,
    private summaryService: SummaryService, private recordService: RecordService) { }

  ngOnInit() {
    this.getRecords();
    this.getSummary();
    this.titleService.setTitle(config.title + ' Dashboard');
  }

  getSummary(): void {
    this.summaryService.getSummary()
     .subscribe(response => {
      if (response['code'] !== 200 ) {
        return ;
      } else {
        this.summary = response['data'];
      }
     });
  }

  nzPageSizeChange(event: number): void {
    this.limit = event;
    this.offset = 0 ;
    this.records.splice(0, this.records.length) ;
    this.getRecords();
  }

  getRecords(): void {
    this.recordService.getOperationRecords(this.offset, this.limit )
       .subscribe(response => {
        this.records = response['data']['operateRecordList'];
        this.total = response['data']['totalCount'];
      });
  }
}
