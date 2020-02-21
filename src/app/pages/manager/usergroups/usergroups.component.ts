import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../../../service/usergroup.service';
import { UserGroup } from '../../../model/usergroup';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usergroups',
  templateUrl: './usergroups.component.html',
  styleUrls: ['./usergroups.component.css']
})
export class UsergroupsComponent implements OnInit {
  groups:UserGroup[] = [];
  total:number ;
  selectedGroup:UserGroup = new UserGroup();

  //modal 
  isOkLoading = false;
  modalVisible = false ; 

  //pagination 
  defaultLimit = 20 ;
  pageIndex = 1;
  limit = this.defaultLimit ; 
  offset = 0;
  pagination = true;
  loading = false ; 

  //
  userDrawerVisible:boolean = false ;

  constructor(private groupService: UserGroupService,
              private modalService: NzModalService,
              private titleService: Title,
              public msg: NzMessageService) { }

  ngOnInit() {
    this.getGroups();
    this.titleService.setTitle('用户组管理');
  }

  getGroups():void {
    this.loading = true;
     this.groupService.getUserGroups(this.offset,this.limit)
      .subscribe(response => {
        this.groups = response["data"]["groupList"];
        console.log(this.groups);
        this.total = response["data"]["totalCount"];
        this.loading = false; 
      }) 
  }

  openEditForm(g:UserGroup):void {
    if  ( g ){
      this.selectedGroup =  g ;
    }else {
      this.selectedGroup = new UserGroup() ;
    }
   
    this.modalVisible = true;
  }
  
  onOk():void{
    this.getGroups();
    this.modalVisible = false ; 
  }

  onCancel():void{
    this.modalVisible = false ; 
  }

  showDeleteConfirm(id:number,name:string): void {
    this.modalService.confirm({
      nzTitle     : '你确定要删除分类群组'+name+'吗?',
      nzContent   : '<b style="color: red;"> 分类群组: '+ name +'</b>',
      nzOkText    : 'Yes',
      nzOkType    : 'danger',
      nzOkLoading  : this.isOkLoading ,
      nzOnOk      : () => new Promise((resolve, reject) => {
        this.isOkLoading = true;
        this.groupService.deleteUserGroup(id)
            .subscribe(response => {
              this.isOkLoading = false;
              if ( response["code"] != 200 ) {
                reject();
              } 
              this.getGroups();
              resolve();
            })
        }).catch(() => console.log('Oops errors!')),
      nzCancelText: 'No',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  getData():void{
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    this.getGroups();
  }

  nzPageSizeChange(event:number):void {
    this.limit = event;
    this.offset = 0 ;
    this.groups.splice(0,this.groups.length) ;
    this.getGroups();
  }

  openUserListDrawer(g:UserGroup):void{
    this.selectedGroup = g ;
    this.userDrawerVisible= true;
  }

  closeUserDrawer():void{
    this.userDrawerVisible = false;
  }
}
