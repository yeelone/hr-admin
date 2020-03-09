import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { RecordService } from '../../../service/record.service';
import { Record } from '../../../model/record';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  loading = false;
  selectedMonth = '';
  records: Record[] = [];
  total: number ;
  bodyModal = false;
  bodyString = [];
  // pagination
  pagination = true ;
  defaultLimit = 20;
  pageIndex = 1 ;
  limit = this.defaultLimit ;
  offset = 0;

  checkMap: Map<number, boolean> = new Map<number, boolean>();
  currentItemID = 0 ;

  constructor(private recordService: RecordService) { }

  @Output()
  allChecked: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const year = dateObj.getUTCFullYear();
    this.selectedMonth =  String(year) + '-' + String(month);
    this.getList();
  }

  getList(): void {
    this.loading = true ;
    this.recordService.getRecords(this.selectedMonth, this.offset, this.limit )
       .subscribe(response => {
        this.records = response['data']['recordList'];

        for ( let i = 0 ; i < this.records.length; i++) {
          if ( this.checkMap.has(this.records[i].id) ) {
            continue;
          }
          const key = 'record-' + this.records[i].id;
          const record = localStorage.getItem(key) || '0';
          console.log(record);

          if ( record === '1' ) {
            this.checkMap.set(this.records[i].id, true);
          } else {
            this.checkMap.set(this.records[i].id, false);
          }
          
        }

        this.total = response['data']['totalCount'];
        this.loading = false ;
      });
  }

  getData(): void {
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    this.getList();
  }

  nzPageSizeChange(event: number): void {
    this.limit = event;
    this.offset = 0 ;
    this.records.splice(0, this.records.length) ;
    this.getList();
  }

  showBodyModal(id: number, body: string): void {
    this.formatBody(body);
    this.bodyModal = true;
    this.currentItemID = id;
  }

  closeBodyModal(): void {
    this.bodyModal = false;
  }

  okModal(): void {
    this.checkMap.set(this.currentItemID, true);
    // 保存在localstorage里，避免用户刷新时要重新从头开始
    const key = 'record-' + this.currentItemID;
    localStorage.setItem(key, '1');
    let size = 0 ;
    this.checkMap.forEach( (value, _) => {
        if ( value ) {
          size++;
          if ( size === this.total ) {
            this.allChecked.emit(true);
          } else {
            this.allChecked.emit(false);
          }
        }
    });
    this.bodyModal = false;
  }

  formatBody(body: string): void {
    this.bodyString = [];
    const data = body.split(';');
    for (let i = 0; i < data.length; i++) {
      const s = data[i].replace('：', ':');
      const line = s.split(':');
      if (line.length === 2 ) {
        this.bodyString.push(line);
      }
    }
  }
}
