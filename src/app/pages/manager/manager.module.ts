import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { UsersComponent } from './users/users.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionComponent } from './permission/permission.component';
import { BackupComponent } from './backup/backup.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';

const COMPONENTS = [
  UsersComponent,
  UsergroupsComponent,
  RolesComponent,
  PermissionComponent,
  BackupComponent,
];

const MODULES = [
  NgZorroAntdModule,
  ManagerRoutingModule,
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
   CustomDirectiveModule,
];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES,
  ]
})
export class ManagerModule { }
