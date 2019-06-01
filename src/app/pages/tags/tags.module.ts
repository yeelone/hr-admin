import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TagsComponent } from './tags.component';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { TagsRoutingModule } from './tags-routing.module';

const MODULES = [
  NgZorroAntdModule,
  TagsRoutingModule,
  CommonModule,
  CustomDirectiveModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
];

@NgModule({
  declarations: [TagsComponent],
  imports: [
     ...MODULES,
  ]
})
export class TagsModule { }
