import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';

const MODULES = [
   NgZorroAntdModule,
  DashboardRoutingModule,
  CommonModule,
  SharedModule
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    ...MODULES,
  ]
})
export class DashboardModule { }
