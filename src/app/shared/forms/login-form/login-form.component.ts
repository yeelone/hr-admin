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
import { CaptchaService } from 'src/app/service/captcha.service';

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

  logo = baseurl + '/api/static/img/icon-min.png';

  captchaImage = '';
  captchaCode = '';
  constructor(
          private fb: FormBuilder,
          private authService: AuthService,
          private msg: NzMessageService,
          private captcha: CaptchaService,
          private route: ActivatedRoute) {
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    // 先检查验证码是否正确

    let u: User = new User();
    u.username = this.validateForm.controls.username.value;
    u.password = this.validateForm.controls.password.value;
    this.authService.login(u, this.captchaCode, this.validateForm.controls.captcha.value)
      .subscribe(
        response => {

          if (response['code'] === 10105 ) {
            this.msg.error('验证码错误');
            this.validateForm.controls.captcha.setErrors({'incorrect': true});
            return;
          }

          if (response['code'] === 200 ) {
            this.msg.success('登录成功，进入系统');
            const roles = response['data']['user']['roles'];
            if ( !roles ) {
              return;
            }
            for (let i = 0; i < roles.length; i++) {
              if ( roles[i].name === '查询岗') {
                this.returnUrl = '/statistics';
              }
            }
            location.href = this.returnUrl;
            // this.router.navigate([this.returnUrl]);
          } else {
            this.validateForm.controls.username.setErrors({'incorrect': true});
            this.validateForm.controls.password.setErrors({'incorrect': true});
          }
        },
        err => {
          this.msg.error('登录失败，请检查用户名与密码是否正确');
        }
      );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      captcha: [ null, [ Validators.required ] ],
    });

    this.genCaptcha();

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  genCaptcha(): void {
    // 获取验证码
    this.captcha.genCaptcha().subscribe(
      response => {
        this.captchaImage = config.baseurl + response['imageUrl'];
        this.captchaCode = response['captchaId'];
      }
    );
  }

}
