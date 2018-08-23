
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

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { PhotoService } from './services/photo.service';
import { TokenInterceptor } from './services/TokenInterceptor';
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
    //----- Possible refactor needed for requiredRoles. 
    //----- Eventually it would suck having to add so many roles to each path. 
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'admin', component: AdminComponent, canActivate: [ AuthGuard ], data: { requiredRoles: ['Admin'] } },
      { path: 'callback', component: CallbackComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [ AuthGuard ], data: { requiredRoles: ['Admin', 'Editor'] } },
      { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [ AuthGuard ], data: { requiredRoles: ['Admin', 'Editor'] } },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    PhotoService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    VehicleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
