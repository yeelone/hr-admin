import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const MODULES = [
  NgZorroAntdModule,
  OrganizationRoutingModule,
  CommonModule,
  CustomDirectiveModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
];

@NgModule({
  declarations: [OrganizationComponent],
  imports: [
     ...MODULES,
  ]
})           
export class OrganizationModule { }
