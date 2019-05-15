import { Component, OnInit,Input } from '@angular/core';
import { UserGroup } from '../../../model/usergroup';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { Role } from '../../../model/role';

@Component({
  selector: 'app-simple-user-list',
  templateUrl: './simple-user-list.component.html',
  styleUrls: ['./simple-user-list.component.css']
})
export class SimpleUserListComponent implements OnInit {

  isGroup:boolean = false ;
  isRole:boolean = false ;

  selectorModalVisible:boolean = false ; 
 
  targetGroup:UserGroup = new UserGroup();
  targetRole:Role = new Role();
  users: User[] = [];
  
  @Input()
  set group(group: UserGroup) {
    this.targetGroup = group;
    if (  Object.keys(group).length   ){
      this.isGroup = true ; 
      this.isRole = false;
      this.getGroupUsers();
    }
  }

  @Input()
  set role(role: Role) {
    this.targetRole = role;
    if (  Object.keys(role).length   ){
      this.isGroup = false ; 
      this.isRole = true;
      this.getRoleUsers();
    }
  }


  constructor(private userService:UserService) { }

  ngOnInit() {
    
  }
  
  getGroupUsers(){
    this.userService.getUsersByGroup(+this.targetGroup.id,0,1000)
        .subscribe(response => {
          this.users = response["data"]["userList"];
        })
  }

  getRoleUsers(){
    this.userService.getUsersByRole(+this.targetRole.id,0,1000)
        .subscribe(response => {
          this.users = response["data"]["userList"];
    })
  }

  changeMembers(users:User[]){
    this.selectorModalVisible = false;
    let ids:number[] = [];
    for( let i=0;i< users.length ; i++){
      ids.push(users[i].id);
    }

    if ( this.isGroup ){
        this.userService.addUsersToGroup(this.targetGroup,ids )
        .subscribe(
          (event : {}) => {
            this.getGroupUsers();
          } ,
          err => {

          }
        )
    }

    if ( this.isRole ){
      this.userService.addUsersToRole(this.targetRole,ids )
        .subscribe(
          (event : {}) => {
            this.getRoleUsers();
          } ,
          err => {

          }
        )
    }
    
  }

  openModal(){
    this.selectorModalVisible = true ;
  }

  closeModal(){
    this.selectorModalVisible = false ;
  }
  
  removeUser(id:number){
    if ( this.isGroup ){
      this.userService.removeUsersToGroup(this.targetGroup,[id] )
      .subscribe(
        (event : {}) => {
          this.getGroupUsers();
        } ,
        err => {

        }
      )
    }

    if ( this.isRole ){
      this.userService.removeUsersToRole(this.targetRole,[id] )
      .subscribe(
        (event : {}) => {
          this.getRoleUsers();
        } ,
        err => {

        }
      )
    }
    
  }
}
