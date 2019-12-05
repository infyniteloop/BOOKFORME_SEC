import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';
 
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { TokenStorageService } from './auth/token-storage.service';
import { UserService } from './services/user.service';
import { AuthService } from './auth/auth.service';
import { LobbyComponent } from './lobby/lobby.component';
import { LobbyService } from './services/lobby.service';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders, TokenStorageService,UserService ,AuthService, LobbyService],
  bootstrap: [AppComponent]
})
export class AppModule { }