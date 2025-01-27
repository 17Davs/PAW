import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auths/login/login.component';
import { DonorRegisterComponent } from './Auths/donor-register/donor-register.component';
import { EntityRegisterComponent } from './Auths/entity-register/entity-register.component';
import { AuthGuardService } from './helper/auth-guard.service';
import { AccessDeniedComponent } from './Auths/access-denied/access-denied.component';
import { HomeComponent } from './home/home.component';
import { DonationCreateComponent } from './Donations/donation-create/donation-create.component';
import { DonationsPageComponent } from './Donations/donations-page/donations-page.component';
import { ProfileComponent } from './Profiles/profile/profile.component';
import { PickupListComponent } from './Pickups/pickup-list/pickup-list.component';
import { EntitiesListComponent } from './Entities/entities-list/entities-list.component';
import { AuthNotLoggedInGuard } from './helper/auth-not-logged-in-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthNotLoggedInGuard],
  },
  {
    path: 'register/donor',
    component: DonorRegisterComponent,
    canActivate: [AuthNotLoggedInGuard],
  },
  {
    path: 'register/entity',
    component: EntityRegisterComponent,
    canActivate: [AuthNotLoggedInGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { allowedUserTypes: ['donor', 'entity'] },
  },
  {
    path: 'donations',
    component: DonationsPageComponent,
    canActivate: [AuthGuardService],
    data: { allowedUserTypes: ['donor', 'entity'] },
  },
  {
    path: 'donations/new',
    component: DonationCreateComponent,
    canActivate: [AuthGuardService],
    data: { allowedUserTypes: ['donor'] },
  },
  {
    path: 'entities',
    component: EntitiesListComponent,
    canActivate: [AuthGuardService],
    data: { allowedUserTypes: ['donor', 'entity'] },
  },
  {
    path: 'pickups',
    component: PickupListComponent,
    canActivate: [AuthGuardService],
    data: { allowedUserTypes: ['donor', 'entity'] },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: { allowedUserTypes: ['donor', 'entity'] },
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to home by default
  { path: '**', redirectTo: '/home' }, // redirect undeclaredd routes to home by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
