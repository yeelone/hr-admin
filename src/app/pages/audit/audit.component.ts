import { Component, OnInit } from '@angular/core';
import { Audit,AuditStateMap } from '../../model/audit';
import { AuditService } from '../../service/audit.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Title } from '@angular/platform-browser';
import config from 'src/app/config/config';
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  audits: Audit[] = [] ;
  current: Audit ;
  total = 0;
  state = 1 ;
  loading = false;

  modalVisible = false;
  bodyModal = false;
  pagination = true;
  objectMap = {
    Profile : '用户档案',
    Template : '模板'
  };

  actionMap = {
    1 : '创建',
    2 : '更新',
    3 : '删除'
  };

  stateMap = AuditStateMap;
  listOfState = [{ text: '不通过', value: '2' },{ text: '通过', value: '1' }, { text: '待审核', value: '0' }, { text: '所有', value: '-1' }];
  body = []; // 后端审核内容格式为 档案ID：6524; 员工姓名:林**; 这样的格式。在显示之前要进行一定的格式化。

  selectedValue ;
  // pagination
  defaultLimit = 20;
  pageIndex = 1 ;
  limit = this.defaultLimit ;
  offset = 0;

  isConfirmLoading = false;

  constructor(private auditService: AuditService, private msg: NzMessageService, private titleService: Title) { }

  ngOnInit() {
     this.getAudits();
     this.titleService.setTitle('审核管理');
  }

  getAudits(): void {
    this.loading = true ;
     this.auditService.getAudits(this.state, this.offset, this.limit)
      .subscribe(response => {
        this.audits = response['data']['auditList'];
        this.total = response['data']['totalCount'];
        this.loading = false ;
      });
  }

  filter(state: number, searchAddress: string): void {
    this.state = state;
    this.offset = 0 ;
    this.pageIndex = 1 ;
    this.getData();
  }

  getData(): void {
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    this.getAudits();
  }

  nzPageSizeChange(event: number): void {
    this.limit = event;
    this.offset = 0 ;
    this.audits.splice(0, this.audits.length) ;
    this.getAudits();
  }

  closeModal(): void {
    this.modalVisible = false;
  }

  openModal(audit: Audit): void {
    this.current = audit;
    this.modalVisible = true;
  }

  handleAudit(state: number): void {
    this.isConfirmLoading = true;
    this.current.state = state ;
    this.auditService.updateState(this.current)
      .subscribe(
        response => {
          this.modalVisible = false;
          this.isConfirmLoading = false;
          this.getAudits();
          this.closeModal();
          this.msg.success('审核成功');
        },
        err => {
          this.modalVisible = false;
          this.isConfirmLoading = false;
           this.msg.success('审核失败');
           console.log('audit fail,error is :' , err );
        }
      );
  }

  showBodyModal(audit: Audit): void {
    this.current = audit;
    if ( this.current.object === 'Template') {

    } else {

    }
    this.formatBody(this.current.body);
    this.bodyModal = true;
  }

  closeBodyModal(): void {
    this.bodyModal = false;
  }

  formatBody(body: string): void {
    this.body = [];
    const data = body.split(';');
    for (let i = 0; i < data.length; i++) {
      const line = data[i].split(':');

      for ( let j = 0 ; j < line.length; j++) {
          if ( line[j].startsWith('(file)[') ) {
             const url = config.api + '/' + line[j].substr(7, line[j].length - 8);
             line[j] = '<a href=' + url + '> 查看变更文件 </a>';
          }
      }
      this.body.push(line);
    }
  }
}
