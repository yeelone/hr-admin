import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/service/health.service';
import { RecordService } from 'src/app/service/record.service';
import { Record } from 'src/app/model/record';
import { SummaryService } from 'src/app/service/summary.service';
import { Summary } from 'src/app/model/summary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  messages: string[] = [];
  records: Record[] = [];

   //pagination 
  pagination = true ;
  defaultLimit = 20;
  pageIndex = 1 ;
  limit = this.defaultLimit ; 
  offset = 0;
  total: number ;
  loading: boolean = false;
  summary: Summary = new Summary();

  constructor(private healthService: HealthService, private summaryService: SummaryService, private recordService: RecordService) { }

  ngOnInit() {
    this.getData();
    this.getRecords();
    this.getSummary();
  }

  getData():void{
    this.healthService.getHealth()
     .subscribe(response => {
       console.log("response",response);
      if (response["code"] !== 200 ){
        return ; 
      }else{
        this.messages = response["data"].split(";");
      }
     }) 
  }

  getSummary(): void {
    this.summaryService.getSummary()
     .subscribe(response => {
       console.log("response",response);
      if (response['code'] !== 200 ) {
        return ;
      } else {
        this.summary = response['data'];
        console.log(this.summary);
      }
     });
  }


  nzPageSizeChange(event:number):void {
    this.limit = event;
    this.offset = 0 ;
    this.records.splice(0,this.records.length) ;
    this.getRecords();
  }

  getRecords():void{
    this.recordService.getOperationRecords(this.offset,this.limit )
       .subscribe(response => {
         console.log(response);
        this.records = response["data"]["operateRecordList"];
        this.total = response["data"]["totalCount"];
      }) 
  }

}
