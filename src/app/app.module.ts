import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { httpInterceptorProviders } from './http-interceptors';

import { SortablejsModule } from 'angular-sortablejs';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuditComponent } from './audit/audit.component';
import { UsersComponent } from './users/users.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { RolesComponent } from './roles/roles.component';
import { AuthGuard } from './shared/injectable/authguard';
import { PermissionComponent } from './permission/permission.component';
import { AdjustComponent } from './shared/salary/adjust/adjust.component';
const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];
registerLocaleData(zh);
import { enableProdMode } from '@angular/core';
import { BackupComponent } from './backup/backup.component';
import { CustomDirectiveModule } from './directive/directive.module';
import { SharedModule } from './shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    AuditComponent,
    UsersComponent,
    UsergroupsComponent,
    RolesComponent,
    PermissionComponent,
    AdjustComponent,
    BackupComponent,
    StatisticsComponent,
    LoginComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SortablejsModule,
    CustomDirectiveModule,
    SharedModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },{ provide: NZ_ICONS, useValue: icons },httpInterceptorProviders,AuthGuard,Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
