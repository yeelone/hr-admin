import { Component, OnInit } from '@angular/core';
import { TemplateaccountService } from '../../../service/templateaccount.service';
import { TemplateService } from  '../../../service/template.service';
import { GroupService } from '../../../service/group.service';
import { SalaryTemplateAccount, SalaryTemplate } from '../../../model/salary';
import { Group } from '../../../model/group';
import { toTreeSelectorData } from '../../../util/covertTreeSelector';
import { NzTreeNode , NzModalService,NzFormatEmitEvent} from 'ng-zorro-antd';

@Component({
  selector: 'app-templateaccount',
  templateUrl: './templateaccount.component.html',
  styleUrls: ['./templateaccount.component.scss']
})
export class TemplateaccountComponent implements OnInit {
  visible:boolean = false;
  list: SalaryTemplateAccount[] = [];
  total:number ;
  
  templates:SalaryTemplate[] = [];
  selectedTemplate:SalaryTemplate;
  selectedTemplates:SalaryTemplate[] = [];
  currentItem:SalaryTemplateAccount;

  allGroups = [];
  groupTree = [];
  groups = [];

  selected = null;
  isOkLoading = false;
  
  constructor(private templateAccountService:TemplateaccountService,
            private templateService:TemplateService,
            private modalService: NzModalService,
            private groupService: GroupService) { }

  ngOnInit() {
    this.get();
    
  }

  get(){
    this.templateAccountService.list()
    .subscribe(response => {
      this.list = response['data']['List'];
      this.total = response['data']['totalCount'];
    })
  }

  getTemplates():void{
    this.templateService.list()
      .subscribe(response => {
        this.templates = response['data']['List'];
      })
  }

  delete(id:number){
    this.templateAccountService.delete(id)
      .subscribe(response => {
        this.get();
      })
  }
  
  openModal(index:number) {
    this.getTemplates();
    if ( index === -1 ){
      this.currentItem = new SalaryTemplateAccount();
    }else{
       this.currentItem = this.list[index];
       this.templateAccountService.get(this.currentItem.id)
        .subscribe(response => {
          this.currentItem = response['data']['template_account'];
          this.selectedTemplates =  [];
          for ( let i=0 ;i< this.currentItem.order.length ; i++){
             for (let j=0;j< this.currentItem.templates.length;j++){
               if (this.currentItem.templates[j].id === this.currentItem.order[i] ){
                 this.selectedTemplates.push(this.currentItem.templates[j]);
               }
             }
          }
        })
    }
   
    this.visible = true;

    this.getGroups();
  }
  
  selectedChange($event):void{
    let already = false;
    for ( let i =0 ; i < this.selectedTemplates.length ; i++ ){
      if ( this.selectedTemplates[i].id === this.selectedTemplate.id ) {
        already = true ;
      }
    }

    if ( !already ){
      this.selectedTemplates.push(this.selectedTemplate);
      this.selectedTemplate = null;
    }
  }

  deleteSelectedTemplate(index:number) {
    this.selectedTemplates.splice(index, 1);
  }

  closeEditForm(){
    this.visible = false;
  }

  onTreeChange(event:string[]){
    // console.log(event)
    // this.groups = [];
    // for ( let i=0;i< event.length;i++){
    //    this.groups.push(this.allGroups[i])
    // }
   
  }

  onOk(){
    this.currentItem.templates = [];
    this.currentItem.order = [];

    for (let i = 0 ;i < this.selectedTemplates.length ; i++ ){
      let id = this.selectedTemplates[i].id;
      let t = new SalaryTemplate();
      t.id = id ;
      this.currentItem.templates.push(t);
      this.currentItem.order.push(id);
    }
    
    if ( this.groups.length ){
      this.currentItem.groups = [];
    }

    for(let i = 0 ; i< this.groups.length ; i++) {
      let g = new Group();
      g.id = this.groups[i];
      this.currentItem.groups.push(g);
    }
    this.templateAccountService.save(this.currentItem)
      .subscribe(response => {
        if ( response['code'] == 200){
          this.get();
        }
      })
  }


  getGroups():void {
    this.groupService.getGroups()
     .subscribe(response => {
       this.allGroups = response["data"]["groupList"];
       this.groupTree = [new NzTreeNode({
         key: '0',
         title: "揭东农商银行",
         children: toTreeSelectorData(this.allGroups)
       })];

     }) 
 }

 showDeleteConfirm(id:number,name:string): void {
    this.modalService.confirm({
      nzTitle     : '你确定要删除账套'+name+'吗?',
      nzContent   : '<b style="color: red;"> 账套: '+ name +'</b>',
      nzOkText    : 'Yes',
      nzOkType    : 'danger',
      nzOkLoading  : this.isOkLoading ,
      nzOnOk      : () => new Promise((resolve, reject) => {
        this.isOkLoading = true;
        this.templateAccountService.delete(id)
        .subscribe(response => {
              this.isOkLoading = false;
              if ( response["code"] != 200 ) {
                reject();
              } 
              this.get();
              resolve();
        })
        }).catch(() => console.log('Oops errors!')),
      nzCancelText: 'No',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

}
