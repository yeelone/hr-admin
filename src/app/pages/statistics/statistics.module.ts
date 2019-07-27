import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StatisticsComponent } from './statistics.component';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';

const MODULES = [
  NgZorroAntdModule,
  StatisticsRoutingModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  CustomDirectiveModule,
  SharedModule,
];
@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    ...MODULES
  ]
})
export class StatisticsModule { }
