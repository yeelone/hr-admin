import { BrowserModule } from '@angular/platform-browser';
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

import { NagivatorComponent } from './shared/layout/nagivator/nagivator.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './employee/employee.component';
import { OrganizationComponent } from './organization/organization.component';
import { TagsComponent } from './shared/table/tags/tags.component';
import { GroupComponent } from './shared/table/group/group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupEditorComponent } from './shared/forms/group-editor/group-editor.component';
import { UserGroupEditorComponent } from './shared/forms/usergroup-editor/usergroup-editor.component';
import { GroupSelectorComponent } from './shared/group-selector/group-selector.component';
import { TagEditorComponent } from './shared/forms/tag-editor/tag-editor.component';
import { GrouptreeComponent } from './shared/tree/grouptree/grouptree.component';
import { ProfileEditorComponent } from './shared/forms/profile-editor/profile-editor.component';
import { ProfileSelectorComponent } from './shared/profile-selector/profile-selector.component';
import { SalaryComponent } from './salary/salary.component';
import { TemplateEditorComponent } from './shared/forms/template-editor/template-editor.component';
import { TemplateComponent } from './shared/salary/template/template.component';
import { TemplateaccountComponent } from './shared/salary/templateaccount/templateaccount.component';
import { ProfileFieldsSelectorComponent } from './shared/profile-fields-selector/profile-fields-selector.component';
import { BuildinfuncSelectorComponent } from './shared/buildinfunc-selector/buildinfunc-selector.component';
import { CoefficientSelectorComponent } from './shared/coefficient-selector/coefficient-selector.component';
import { FormulaInputComponent } from './shared/formula-input/formula-input.component';
import { SalaryCalculatorComponent } from './shared/salary-calculator/salary-calculator.component';
import { TemplateFieldsSelectorComponent } from './shared/template-fields-selector/template-fields-selector.component';
import { SimpleProfileListComponent } from './shared/table/simple-profile-list/simple-profile-list.component';
import { TagProfileListComponent } from './shared/table/tag-profile-list/tag-profile-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CoefficientComponent } from './coefficient/coefficient.component';
import { AuditComponent } from './audit/audit.component';
import { UsersComponent } from './users/users.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { UserGroupSelectorComponent } from './shared/usergroup-selector/usergroup-selector.component';
import { RolesComponent } from './roles/roles.component';
import { UserSelectorComponent } from './shared/user-selector/user-selector.component';
import { UsergroupTreeComponent } from './shared/tree/usergroup-tree/usergroup-tree.component';
import { SimpleUserListComponent } from './shared/table/simple-user-list/simple-user-list.component';
import { UserEditorComponent } from './shared/forms/user-editor/user-editor.component';
import { LoginFormComponent } from './shared/forms/login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { AuthGuard } from './shared/injectable/authguard';
import { PermissionComponent } from './permission/permission.component';
import { CanAccessDirective } from './directive/can-access.directive';
import { UploadComponent } from './shared/upload/upload.component';
import { GroupTreeSelectorComponent } from './shared/tree/group-tree-selector/group-tree-selector.component';
import { TemplateFieldMultiSelectorComponent } from './shared/template-field-multi-selector/template-field-multi-selector.component';
import { TemplateAccountSelectorComponent } from './shared/template-account-selector/template-account-selector.component';
import { ProfileDetailComponent } from './shared/profile-detail/profile-detail.component';
import { TagSelectorComponent } from './shared/tag-selector/tag-selector.component';
import { TransferComponent } from './shared/table/transfer/transfer.component';
import { RecordComponent } from './shared/table/record/record.component';
import { GroupTagRuleEditorComponent } from './shared/forms/group-tag-rule-editor/group-tag-rule-editor.component';
import { AdjustComponent } from './shared/salary/adjust/adjust.component';
const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];
registerLocaleData(zh);
import { enableProdMode } from '@angular/core';
import { BackupComponent } from './backup/backup.component';
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    NagivatorComponent,
    ProfileComponent,
    EmployeeComponent,
    OrganizationComponent,
    TagsComponent,
    GroupComponent,
    GroupEditorComponent,
    UserGroupEditorComponent,
    GroupSelectorComponent,
    UserGroupSelectorComponent,
    TagEditorComponent,
    GrouptreeComponent,
    ProfileEditorComponent,
    ProfileSelectorComponent,
    SalaryComponent,
    TemplateEditorComponent,
    TemplateaccountComponent,
    ProfileFieldsSelectorComponent,
    BuildinfuncSelectorComponent,
    CoefficientSelectorComponent,
    FormulaInputComponent,
    TemplateComponent,
    SalaryCalculatorComponent,
    TemplateFieldsSelectorComponent,
    SimpleProfileListComponent,
    TagProfileListComponent,
    StatisticsComponent,
    CoefficientComponent,
    AuditComponent,
    UsersComponent,
    UsergroupsComponent,
    RolesComponent,
    UserSelectorComponent,
    UsergroupTreeComponent,
    SimpleUserListComponent,
    UserEditorComponent,
    LoginFormComponent,
    LoginComponent,
    HeaderComponent,
    PermissionComponent,
    CanAccessDirective,
    UploadComponent,
    GroupTreeSelectorComponent,
    TemplateFieldMultiSelectorComponent,
    TemplateAccountSelectorComponent,
    ProfileDetailComponent,
    TagSelectorComponent,
    TransferComponent,
    RecordComponent,
    GroupTagRuleEditorComponent,
    AdjustComponent,
    BackupComponent,
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
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },{ provide: NZ_ICONS, useValue: icons },httpInterceptorProviders,AuthGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }
