import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser:User;
  targetGroup:number ; 
  total:number ;
  
  defaultLimit = 20;
  //editor drawer 
  visible = false ; 

  //modal 
  isOkLoading = false;
  modalVisible = false ; 
  importModalVisible = false; 

  //state map 
  stateMap = {
    0 : "激活",
    1 : "冻结" 
  }
  //table config
  pageIndex = 1;
  limit = this.defaultLimit ; 
  offset = 0;
  pagination = true;
  loading = false ; 

  allChecked = false;
  disabledButton = true;

  checkedMap = {};
  
  //search 
  searchValue = '';

  // @Input()
  // onSubmit:boolean

  constructor(private userService: UserService,
              private modalService: NzModalService,
              private titleService: Title,
              private msg: NzMessageService) { }

  ngOnInit() {
    this.getUsers();
    this.titleService.setTitle('用户管理');
  }

  changeSubmitStatus(event:boolean){
    this.getData();
  }

  getUsers():void {
    this.loading = true ; 
     this.userService.getUsers(this.offset,this.limit)
      .subscribe(response => {
        this.users = response["data"]["userList"];
        this.total = response["data"]["totalCount"];
        this.loading = false ; 
      }) 
  }

  getSelectedNode(event:number):void{
    this.targetGroup = event;
    this.limit = this.defaultLimit;
    this.offset = 0 ;
    this.users.splice(0,this.users.length) ;
    this.getUsersByGroup();
  }

  getUsersByGroup():void{
    this.loading = true ; 
    this.userService.getUsersByGroup(this.targetGroup,this.offset,this.limit)
      .subscribe(response => {
        this.users = response["data"]["userList"];
        this.total = response["data"]["totalCount"];
        this.loading = false ; 
      })
  }

  updateUser(user:User):void{
      this.loading = true ; 
      this.userService.updateUser(user)
        .subscribe(response => {
          this.users = response["data"]["userList"];
          this.total = response["data"]["totalCount"];
          this.loading = false ; 
          this.getData();
        })
  }
  
  nzPageSizeChange(event:number):void {
    this.limit = event;
    this.offset = 0 ;
    this.users.splice(0,this.users.length) ;
    if ( this.targetGroup ){
      this.getUsersByGroup();
    }else{
      this.getUsers();
    }
  }

  getData():void{
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    
    if ( this.targetGroup ){
      this.getUsersByGroup();
    }else{
      this.getUsers();
    }
  }

  checkAll(value: boolean): void {
    this.allChecked = value;
    this.users.forEach(data => {
      this.checkedMap[data.id] = value;
    });
  }

  refreshMap(id:number): void {
    if (this.checkedMap[id]) {
      this.checkedMap[id] = !this.checkedMap[id];
    }

    this.checkedMap[id] = true ;
  }

  openEditForm(user:User):void {
    if (user){
      this.selectedUser = user;
    }else{
      this.selectedUser = null;
    }
    this.visible = true;
  }

  closeEditForm():void{
    this.visible = false ; 
  }

  showDeleteConfirm(id:number,name:string): void {
    this.modalService.confirm({
      nzTitle     : '你确定要删除用户'+name+'吗?',
      nzContent   : '<b style="color: red;"> 员工姓名: '+ name +'</b>',
      nzOkText    : 'Yes',
      nzOkType    : 'danger',
      nzOkLoading  : this.isOkLoading ,
      nzOnOk      : () => new Promise((resolve, reject) => {
        this.isOkLoading = true;
        this.userService.deleteUser(id)
            .subscribe(response => {
              this.isOkLoading = false;
              if ( response["code"] != 200 ) {
                reject();
              } 
              this.getData();
              resolve();
            })
        }).catch(() => console.log('Oops errors!')),
      nzCancelText: 'No',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  import(){
    this.importModalVisible = true ; 
  }

  closeImportModal(){
    this.importModalVisible = false ; 
  }

  openImportModal(){
    this.importModalVisible = true ; 
  }

  search(key:string):void{
    this.loading = true ; 
    this.offset = 0 ; 
    this.pageIndex = 1 ; 
    this.userService.searchUsers(key, this.searchValue,this.offset,this.limit)
        .subscribe(
          (response:{}) => {
            this.msg.success('搜索成功，正为您更新列表');
            this.users = response["data"]["userList"];
            this.total = response["data"]["totalCount"];
            this.loading = false; 
          },
          err => {
            this.msg.error('搜索失败，'+ err);
            this.loading = false; 
          }

         
        )
  }

  resetPassword():void{
    let keys = Object.keys(this.checkedMap) ;
    let uids:number[] = [];
    for (let i = 0 ; i < keys.length ; i++){
      uids.push(+keys[i])
    }
    
    this.loading = true ; 
    this.userService.resetPassword(uids)
      .subscribe(
        (event: {}) => {
           this.msg.success('已为您成功重置密码，默认密码为000000');
            this.loading  = false ;
        }, 
        err => {
          this.msg.error('无法重置密码，错误信息为:' + err );
        }
      )

  }

  freeze():void{
    let keys = Object.keys(this.checkedMap) ;
    let uids:number[] = [];
    for (let i = 0 ; i < keys.length ; i++){
      uids.push(+keys[i])
    }
    
    this.loading = true ; 
    this.userService.freezeUsers(uids)
      .subscribe(
        (event: {}) => {
           this.msg.success('已为您冻结选择用户，默认密码为000000');
            this.loading  = false ;
            this.getUsers();
        }, 
        err => {
          this.msg.error('无法冻结用户，错误信息为:' + err );
        }
      )
  }

  active():void{
    let keys = Object.keys(this.checkedMap) ;
    let uids:number[] = [];
    for (let i = 0 ; i < keys.length ; i++){
      uids.push(+keys[i])
    }
    
    this.loading = true ; 
    this.userService.activeUsers(uids)
      .subscribe(
        (event: {}) => {
           this.msg.success('已为您激活选择用户，默认密码为000000');
            this.loading  = false ;
            this.getUsers();
        }, 
        err => {
          this.msg.error('无法激活用户，错误信息为:' + err );
        }
      )
  }
}
