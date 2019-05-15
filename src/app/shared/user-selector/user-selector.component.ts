import { Component, OnInit, Input,SimpleChanges, Output,EventEmitter } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit {
  @Input()
  visible:boolean = false;

  
  list:any[] = [];
  users: User[] = [];
  defaultUsers:User[] = [];
  targetGroup:number =0 ; 

  checkedUsers: User[] = []; //已选择的user

  members:Map<number,string> = new Map<number,string>();

  total:number;
  defaultLimit = 20;
  
  selectedMap = {};

  //table configs
  pageIndex = 1;
  limit = this.defaultLimit ; 
  offset = 0;
  pagination = true;
  loading = false ; 

  @Output()
  onSelect:EventEmitter<User[]>=new EventEmitter();

  @Output()
  onCancel:EventEmitter<boolean>=new EventEmitter();

  constructor(private userService: UserService,public msg: NzMessageService) { }

  ngOnInit() {
    this.msg.success(`获取用户列表`);
    this.getData();
  }

  getData():void{
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    this.getUsersByGroup();
  }

  onPageIndexChange(index:number){
    this.pageIndex = index;
    this.getData();
  }

  onPageSizeChange(size:number){
    this.limit = size;
    this.pageIndex= 1;
    this.getData();
  }

  onSubmit():void{
    this.onSelect.emit(this.checkedUsers);
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

  checkAllUsers():void{
    this.loading = true ; 
    this.userService.getUsersByGroup(this.targetGroup,0,100000)
      .subscribe(response => {
        this.checkedUsers = response["data"]["userList"];
        this.total = response["data"]["totalCount"];
        this.loading = false ; 
      })
  }


  checkUser(u:User){
    this.selectedMap[u.id] = !this.selectedMap[u.id] ; 
    let _temp :User[] = this.checkedUsers.slice();
    if ( this.selectedMap[u.id]) {
      _temp.push(u);
      this.checkedUsers = _temp;
    }else{
      for ( let i=0; i< this.checkedUsers.length; i++){
        if ( this.checkedUsers[i].id === u.id ) {
          _temp.splice(i,1);
          this.checkedUsers = _temp;
        }
      }
    }
    
  }
  openModal(){
    this.visible = true ; 
  }

  closeModal(){
    this.visible = false ; 
    this.onCancel.emit(true);
  }

}
