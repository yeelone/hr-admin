import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { AuthService } from '../../../service/auth.service';
import { Role } from '../../../model/role';
import { UserService } from '../../../service/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageService } from 'src/app/service/message.service';
import { MessageCount } from 'src/app/model/message';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  roles: Role[] = [];
  visible = false;
  notify: MessageCount;
  newPassword = '';
  messageVisible = true;
  isSubmiting = false;
  constructor(private authService: AuthService, private userService: UserService, 
      private messageService: MessageService,
      private msg: NzMessageService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();
    this.getMsgCount();
    this.roles = this.currentUser.roles;
  }

  logout(): void {
    this.authService.logout();
  }

  resetPassword(): void {
    if (this.newPassword.length > 0 ) {
      this.isSubmiting = true;
      this.userService.changePassword(this.currentUser.id, this.newPassword)
        .subscribe(
          response => {
            this.msg.success('已成功为您修改了密码');
             this.isSubmiting = false;
          },
          err => {
            this.msg.error('修改密码出错 ' + err);
            this.isSubmiting = false;
          }
        );
    } else {
      this.msg.error('请输入密码');
    }
  }

  getMsgCount(): void {
    this.messageService.getCount(this.currentUser.id)
      .subscribe(
        response => {
          this.notify = response['data'];
        },
        err => {
        }
      );
  }

  openModal(): void {
    this.visible = true;
  }

  closeModal(): void {
    this.visible = false;
  }

  closeDrawer(): void {
    this.messageVisible = false;
  }
}
