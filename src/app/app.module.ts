import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { httpInterceptorProviders } from './http-interceptors';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/injectable/authguard';
const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];
registerLocaleData(zh);
import { enableProdMode } from '@angular/core';
import { CustomDirectiveModule } from './directive/directive.module';
import { SharedModule } from './shared/shared.module';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomDirectiveModule,
    SharedModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, { provide: NZ_ICONS, useValue: icons }, httpInterceptorProviders,AuthGuard,Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
