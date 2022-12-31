import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { HomeComponent } from './components/user/home/home.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule} from  '@angular/material/list';
import { MatSidenavModule} from  '@angular/material/sidenav';
import { MatIconModule } from  '@angular/material/icon';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatCardModule } from  '@angular/material/card';
import { MatInputModule } from  '@angular/material/input';
import { MatTableModule } from  '@angular/material/table';
import { MatProgressBarModule } from  '@angular/material/progress-bar';
import { MatPaginatorModule } from  '@angular/material/paginator';
import { MatSortModule  } from  '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    DetailComponent,
    DashboardComponent,
    UserListComponent,
    ProductListComponent,
    UserTemplateComponent,
    AdminTemplateComponent,
    NotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
