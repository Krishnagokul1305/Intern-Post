import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadsComponent } from './uploads/uploads.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { authGuard } from '../guards/auth.guard';
import { UserUpdateComponent } from '../components/user-update/user-update.component';
import { OfferDetailsComponent } from '../components/offer-details/offer-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivate:[authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        // canActivate: [authGuard],
      }, // Redirect empty path to 'dashboard'
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [authGuard],
      },
      { path: 'uploads', component: UploadsComponent },
      { path: 'uploads/:id', component: OfferDetailsComponent },
      { path: 'details', component: UserUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
