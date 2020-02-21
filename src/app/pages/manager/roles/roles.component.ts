import { Component, OnInit } from '@angular/core';
import { Role } from '../../../model/role';
import { User } from '../../../model/user';
import { RoleService } from '../../../service/role.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[] ;
  total:number ;
  loading:boolean = false; 
  selectedRole:Role = new Role();
  users:User[];
  
  //pagination 
  defaultLimit = 20;
  pageIndex = 1 ;
  limit = this.defaultLimit ; 
  offset = 0;

  userDrawerVisible:boolean = false ; 

  constructor(private roleService: RoleService, private titleService: Title) { }

  ngOnInit() {
     this.getRoles();
     this.titleService.setTitle('用户角色管理');
  }

  getRoles():void {
    this.loading = true ; 
     this.roleService.getRoles(this.offset,this.limit)
      .subscribe(response => {
        this.roles = response["data"]["roleList"];
        this.total = response["data"]["totalCount"];
        this.loading = false ; 
      }) 
  }

  getData():void{
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    this.getRoles();
  }

  nzPageSizeChange(event:number):void {
    this.limit = event;
    this.offset = 0 ;
    this.roles.splice(0,this.roles.length) ;
    this.getRoles();
  }

  openUserListDrawer(role:Role):void{
    this.selectedRole = role ;
    this.userDrawerVisible= true;
  }

  closeUserDrawer():void{
    this.userDrawerVisible = false;
  }


}
