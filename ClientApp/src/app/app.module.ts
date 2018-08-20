import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PaginationComponent } from './shared/pagination.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { PhotoService } from './services/photo.service';
import { VehicleService } from './services/vehicle.service';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    CallbackComponent,
    CounterComponent,
    FetchDataComponent,
    HomeComponent,
    NavMenuComponent,
    PaginationComponent,
    UnauthorizedComponent,
    VehicleFormComponent,
    VehicleListComponent,
    ViewVehicleComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuard ] },
      { path: 'callback', component: CallbackComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
    ])
  ],
  providers: [
    AdminAuthGuard,
    AuthService,
    AuthGuard,
    PhotoService,
    VehicleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
