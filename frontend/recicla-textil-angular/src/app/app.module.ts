import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChartModule } from 'angular-highcharts';
import { MatGridListModule } from '@angular/material/grid-list';

import { JwtInterceptorService } from './helper/jwt-interceptor.service';
import { AuthGuardService } from './helper/auth-guard.service';
import { AuthenticationService } from './helper/authentication.service';
import { AuthNotLoggedInGuard } from './helper/auth-not-logged-in-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DonorRegisterComponent } from './Auths/donor-register/donor-register.component';
import { EntityRegisterComponent } from './Auths/entity-register/entity-register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './Auths/login/login.component';
import { DonorHomeComponent } from './Donors/donor-home/donor-home.component';
import { EntityHomeComponent } from './Entities/entity-home/entity-home.component';
import { EntitiesListComponent } from './Entities/entities-list/entities-list.component';
import { EntityDetailsComponent } from './Entities/entity-details/entity-details.component';
import { PickupListComponent } from './Pickups/pickup-list/pickup-list.component';
import { PickupDetailsComponent } from './Pickups/pickup-details/pickup-details.component';
import { RuleListComponent } from './Rules/rule-list/rule-list.component';
import { RuleDetailsComponent } from './Rules/rule-details/rule-details.component';
import { PointRulesComponent } from './PointRules/point-rules/point-rules.component';
import { DonationsPageComponent } from './Donations/donations-page/donations-page.component';
import { DonationsListComponent } from './Donations/donations-list/donations-list.component';
import { DonationDetailsComponent } from './Donations/donation-details/donation-details.component';

import { DonationCreateComponent } from './Donations/donation-create/donation-create.component';
import { ProfileComponent } from './Profiles/profile/profile.component';
import { ConvertPointsComponent } from './Donors/convert-points/convert-points.component';
import { DonorProfileComponent } from './Profiles/donor-profile/donor-profile.component';
import { EntityProfileComponent } from './Profiles/entity-profile/entity-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonorRegisterComponent,
    EntityRegisterComponent,
    SidebarComponent,
    ToolbarComponent,
    LoginComponent,
    DonorHomeComponent,
    EntityHomeComponent,
    EntityDetailsComponent,
    EntitiesListComponent,
    PickupListComponent,
    PickupDetailsComponent,
    RuleListComponent,
    RuleDetailsComponent,
    PointRulesComponent,
    DonationsPageComponent,
    DonationCreateComponent,
    ProfileComponent,
    ConvertPointsComponent,
    DonorProfileComponent,
    EntityProfileComponent,
    DonationsListComponent,
    DonationDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    CommonModule,
    MatToolbarModule,
    ChartModule,
    MatGridListModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()), // Enable fetch API
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    AuthGuardService,
    AuthenticationService,
    AuthNotLoggedInGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
