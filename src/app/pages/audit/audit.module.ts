import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const MODULES = [
  NgZorroAntdModule,
  AuditRoutingModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
];

@NgModule({
  declarations: [AuditComponent],
  imports: [
    ...MODULES,
  ]
})
export class AuditModule { }
