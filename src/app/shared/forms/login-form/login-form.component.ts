import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import config from '../../../config/config';
import { User } from '../../../model/user';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

const baseurl = config.baseurl;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  logo = baseurl + "/api/static/img/icon-min.png"
  
  constructor(
          private fb: FormBuilder, 
          private authService:AuthService,
          private msg: NzMessageService,
          private route: ActivatedRoute,) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    
    let u:User = new User();
    u.username = this.validateForm.controls.username.value;
    u.password = this.validateForm.controls.password.value;
    this.authService.login(u)
      .subscribe(
        response => {
          if (response['code'] == 200 ) {
            this.msg.success("登录成功，进入系统");
            let roles = response['data']['user']['roles'];
            if ( !roles ) {
              return;
            }
            for(let i=0;i<roles.length;i++){
              if ( roles[i].name == '查询岗'){
                this.returnUrl = '/statistics';
              }
            }
            location.href = this.returnUrl; 
            // this.router.navigate([this.returnUrl]);
          }else{
            this.msg.error("登录失败，请检查用户名与密码是否正确");
          }
        }, 
        err => {
          this.msg.error("登录失败，请检查用户名与密码是否正确");
        }
      )
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


  }


}
