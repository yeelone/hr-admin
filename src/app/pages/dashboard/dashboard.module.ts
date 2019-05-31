import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const MODULES = [
   NgZorroAntdModule,
  DashboardRoutingModule,
  CommonModule,
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    ...MODULES,
  ]
})
export class DashboardModule { }
