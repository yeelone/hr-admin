import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/service/health.service';
import { RecordService } from 'src/app/service/record.service';
import { Record } from 'src/app/model/record';

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
  total:number ;

  constructor(private healthService:HealthService,private recordService:RecordService) { }

  ngOnInit() {
    this.getData();
    this.getRecords();
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
