import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { AuthService } from '../../../service/auth.service';
import { Role } from '../../../model/role';
import { UserService } from '../../../service/user.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser:User;
  roles:Role[] = [];
  visible:boolean = false; 

  newPassword:string = ""; 

  isSubmiting:boolean = false; 
  constructor(private authService:AuthService,private userService:UserService,private msg:NzMessageService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();

    this.roles = this.currentUser.roles;
  }

  logout():void{
    this.authService.logout();
  }

  resetPassword():void{
    if (this.newPassword.length > 0 ){
      this.isSubmiting = true; 
      this.userService.changePassword(this.currentUser.id, this.newPassword)
        .subscribe(
          response => {
            this.msg.success("已成功为您修改了密码");
             this.isSubmiting = false;
          }, 
          err => {
            this.msg.error("修改密码出错 " + err);
            this.isSubmiting = false;
          }
        )
    }else{
      this.msg.error("请输入密码")
    }
  }

  openModal():void{
    this.visible = true; 
  }

  closeModal():void{
    this.visible = false;
  }
}
