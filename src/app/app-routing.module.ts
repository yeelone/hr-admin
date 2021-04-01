import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './shared/profile-detail/profile-detail.component';
import { AuthGuard } from './shared/injectable/authguard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileDetailComponent, canActivate: [AuthGuard] },
   { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  { path: 'employee',  loadChildren: () => import('./pages/employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthGuard] },
  { path: 'org', loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationModule), canActivate: [AuthGuard]},
  { path: 'tags', loadChildren: () => import('./pages/tags/tags.module').then(m => m.TagsModule), canActivate: [AuthGuard] },
  { path: 'salary', loadChildren: () => import('./pages/salary/salary.module').then(m => m.SalaryModule), canActivate: [AuthGuard]},
  { path: 'manager', loadChildren: () => import('./pages/manager/manager.module').then(m => m.ManagerModule), canActivate: [AuthGuard]},
  { path: 'statistics',loadChildren: () => import('./pages/statistics/statistics.module').then(m => m.StatisticsModule), canActivate: [AuthGuard] },
  { path: 'task', loadChildren: () => import('./pages/audit/audit.module').then(m => m.AuditModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
