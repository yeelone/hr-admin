import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../../service/record.service';
import { Record } from '../../../model/record';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  loading:boolean = false;
  selectedMonth = "";
  records:Record[] = [];
  total:number ;
  bodyModal:boolean = false; 
  bodyString = [];
  //pagination 
  pagination = true ;
  defaultLimit = 20;
  pageIndex = 1 ;
  limit = this.defaultLimit ; 
  offset = 0;

  constructor(private recordService:RecordService) { }

  ngOnInit() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var year = dateObj.getUTCFullYear();
    this.selectedMonth =  String(year) + "-" + String(month);
    this.getList();
  }

  getList():void{
    this.loading = true ; 
    this.recordService.getRecords(this.selectedMonth,this.offset,this.limit )
       .subscribe(response => {
        this.records = response["data"]["recordList"];
        this.total = response["data"]["totalCount"];
        this.loading = false ; 
      }) 
  }

  
  getData():void{
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    this.getList();
  }

  nzPageSizeChange(event:number):void {
    this.limit = event;
    this.offset = 0 ;
    this.records.splice(0,this.records.length) ;
    this.getList();
  }

  showBodyModal(body:string):void{
    this.formatBody(body);
    this.bodyModal = true; 
  }

    closeBodyModal():void{
      this.bodyModal = false; 
    }

    formatBody(body:string):void{
      this.bodyString = [];
      let data = body.split(";");
      for (let i=0;i<data.length;i++){
        let s = data[i].replace("：", ":");
        let line = s.split(":")
        this.bodyString.push(line);
      }
    }
}
