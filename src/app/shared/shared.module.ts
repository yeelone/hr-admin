import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { GroupEditorComponent } from './forms/group-editor/group-editor.component';
import { UserGroupEditorComponent } from './forms/usergroup-editor/usergroup-editor.component';
import { GroupSelectorComponent } from './group-selector/group-selector.component';
import { UserGroupSelectorComponent } from './usergroup-selector/usergroup-selector.component';
import { TagEditorComponent } from './forms/tag-editor/tag-editor.component';
import { GrouptreeComponent } from './tree/grouptree/grouptree.component';
import { ProfileEditorComponent } from './forms/profile-editor/profile-editor.component';
import { ProfileSelectorComponent } from './profile-selector/profile-selector.component';
import { TemplateEditorComponent } from './forms/template-editor/template-editor.component';
import { ProfileFieldsSelectorComponent } from './profile-fields-selector/profile-fields-selector.component';
import { BuildinfuncSelectorComponent } from './buildinfunc-selector/buildinfunc-selector.component';
import { CoefficientSelectorComponent } from './coefficient-selector/coefficient-selector.component';
import { FormulaInputComponent } from './formula-input/formula-input.component';
import { TemplateFieldsSelectorComponent } from './template-fields-selector/template-fields-selector.component';
import { SimpleProfileListComponent } from './table/simple-profile-list/simple-profile-list.component';
import { TagProfileListComponent } from './table/tag-profile-list/tag-profile-list.component';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { UsergroupTreeComponent } from './tree/usergroup-tree/usergroup-tree.component';
import { SimpleUserListComponent } from './table/simple-user-list/simple-user-list.component';
import { UserEditorComponent } from './forms/user-editor/user-editor.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { HeaderComponent } from './layout/header/header.component';
import { UploadComponent } from './upload/upload.component';
import { GroupTreeSelectorComponent } from './tree/group-tree-selector/group-tree-selector.component';
import { TemplateFieldMultiSelectorComponent } from './template-field-multi-selector/template-field-multi-selector.component';
import { TemplateAccountSelectorComponent } from './template-account-selector/template-account-selector.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { TagSelectorComponent } from './tag-selector/tag-selector.component';
import { TransferComponent } from './table/transfer/transfer.component';
import { RecordComponent } from './table/record/record.component';
import { GroupTagRuleEditorComponent } from './forms/group-tag-rule-editor/group-tag-rule-editor.component';
import { CustomDirectiveModule } from '../directive/directive.module';
import { SortablejsModule } from 'angular-sortablejs';
import { RouterModule } from '@angular/router';
import { NagivatorComponent } from './layout/nagivator/nagivator.component';

const COMPONENTS = [
    GroupEditorComponent,
    UserGroupEditorComponent,
    GroupSelectorComponent,
    UserGroupSelectorComponent,
    TagEditorComponent,
    GrouptreeComponent,
    ProfileEditorComponent,
    ProfileSelectorComponent,
    TemplateEditorComponent,
    ProfileFieldsSelectorComponent,
    BuildinfuncSelectorComponent,
    CoefficientSelectorComponent,
    FormulaInputComponent,
    TemplateFieldsSelectorComponent,
    SimpleProfileListComponent,
    TagProfileListComponent,
    UserSelectorComponent,
    UsergroupTreeComponent,
    SimpleUserListComponent,
    UserEditorComponent,
    LoginFormComponent,
    HeaderComponent,
    UploadComponent,
    GroupTreeSelectorComponent,
    TemplateFieldMultiSelectorComponent,
    TemplateAccountSelectorComponent,
    ProfileDetailComponent,
    TagSelectorComponent,
    TransferComponent,
    RecordComponent,
    GroupTagRuleEditorComponent,
    NagivatorComponent,
];

const MODULES = [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    CustomDirectiveModule,
    SortablejsModule,
    RouterModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  exports:[
    ...COMPONENTS,
  ],
  imports:[
    ...MODULES,
  ],
  entryComponents: [
    ...COMPONENTS,
  ],
})
export class SharedModule { }