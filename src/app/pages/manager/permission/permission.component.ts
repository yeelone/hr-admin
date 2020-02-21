import { Component, OnInit } from '@angular/core';
import { Role } from '../../../model/role';
import { PermissionService } from '../../../service/permission.service';
import { RoleService } from '../../../service/role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  roles: Role[] = [];
  selectedRole: number ;
  permissions = {};
  loading = false;

  checkOptions  = [] ;
  constructor(private permissionService: PermissionService,
            private msg: NzMessageService,
            private titleService: Title,
            private roleService: RoleService) { }

  ngOnInit() {
    this.roleService.getRoles(0, 100)
      .subscribe(
        response => {
          this.roles = response['data']['roleList'];
        },
        err => { this.msg.error('无法获取角色列表:' + err);
        }
      );
      this.titleService.setTitle('权限管理');
  }

  getPermissions(): void {
    this.loading = true ;
    this.permissionService.getPermission(this.selectedRole)
      .subscribe(response => {
        if ( response['code'] === 200 ) {
          this.permissions = response['data']['fields'];
          this.setCheckbox();
        } else {
          this.msg.error('无法获取权限设置列表，请确定你有访问的权限');
        }

        this.loading = false ;
      }); 
  }

  setCheckbox(): void {
    for (const i in this.permissions) {
      let options  = [];
      for ( const j in this.permissions[i]) {
        const option = {label: j, value: j, checked: this.permissions[i][j].checked};
        options.push(option);
      }
      this.checkOptions.push({name: i, options});
    }

  }

  onSelected(): void {
    this.checkOptions  = [];
    this.getPermissions();
  }

  submit(): void {
    let name = '';
    for ( let i = 0 ; i < this.roles.length ; i++) {
      if (this.roles[i].id === +this.selectedRole) {
        name = this.roles[i].name;
      }
    }
    this.permissionService.createPermission(name, this.permissions)
      .subscribe(
        response => {
          this.msg.success('成功修改权限');
        },
        err => { this.msg.error(err); }
      );
  }
}
