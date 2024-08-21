  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { ManageuploadsComponent } from './manageuploads/manageuploads.component';
  import { LayoutComponent } from '../components/layout/layout.component';
import { authGuard } from '../guards/auth.guard';

  const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      // canActivate:[authGuard],
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'uploads', component: ManageuploadsComponent },
      ],
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminRoutingModule {}
