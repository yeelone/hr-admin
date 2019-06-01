import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionComponent } from './permission/permission.component';
import { BackupComponent } from './backup/backup.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent },
  {path: 'groups', component: UsergroupsComponent },
  {path: 'roles', component: RolesComponent },
  {path: 'permission', component: PermissionComponent },
  {path: 'backup', component: BackupComponent },
  {}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
