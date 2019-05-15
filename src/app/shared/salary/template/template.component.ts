import { Component, OnInit } from '@angular/core';
import { NzModalService} from 'ng-zorro-antd';
import { SalaryTemplate } from '../../../model/salary';
import { TemplateService } from '../../../service/template.service';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  list: SalaryTemplate[];
  isOkLoading = false;
  updateOrderBtnVisible = false;

  options: SortablejsOptions = {
    animation: 150
  };

  constructor(private templateService:TemplateService,private modalService: NzModalService) { 
    this.options = {
      onUpdate: (event: any) => {
        this.updateOrderBtnVisible = true ; 
        for( let i=0 ;i < this.list.length;i++){
          this.list[i].order = i + 1 ;
        }
      }
    };
  }
  
  ngOnInit() {
    this.getList();
  }

  getList(){
    this.templateService.list()
    .subscribe(response => {
      this.list = response['data']['List'];
    })
  }

  showDeleteConfirm(id:number,name:string): void {
    this.modalService.confirm({
      nzTitle     : '你确定要删除模板'+name+'吗?',
      nzContent   : '<b style="color: red;"> 模板: '+ name +'</b>',
      nzOkText    : 'Yes',
      nzOkType    : 'danger',
      nzOkLoading  : this.isOkLoading ,
      nzOnOk      : () => new Promise((resolve, reject) => {
        this.isOkLoading = true;
        this.templateService.delete(id)
          .subscribe(response => {
             this.isOkLoading = false;
              if ( response["code"] != 200 ) {
                reject();
              } 
              this.getList();
              resolve();
          })
        }).catch(() => console.log('Oops errors!')),
      nzCancelText: 'No',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  updateOrderConfirm():void{
    let orders = {};

    for ( let i=0;i < this.list.length;i++){
      orders[this.list[i].id] = this.list[i].order;
    }

    this.templateService.updateOrders(orders)
      .subscribe(response => {
        if ( response["code"] != 200 ) {
            alert("更新出现错误:" + response["message"] );
            return ;
        } 

        this.updateOrderBtnVisible = false;
        alert("更新成功");
      })
  }

}
