import { Component, OnInit , Output, EventEmitter} from '@angular/core';
 
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { Router } from '@angular/router';
import { UserInfo } from '../models/userinfo.model';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
 
  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private _router: Router) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
 
  onSubmit() {
    console.log(" \n>>>>>>>>>> : LoginComponent / onSubmit");
    console.log(this.form);
 
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);
 
    console.log(" \n---------- : Calling attemptAuth");
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {

        
        console.log("DATA " + JSON.stringify(data));
        //console.log("data.username " + data.username);
        //console.log("data.authorities " + data.authorities);

        console.log(" \n<<<<<<<<<<< : LoginComponent / onSubmit - data returned");
        console.log(" \n---------- : Calling saveToken");
        this.tokenStorage.saveToken(data.accessToken);
        console.log(" \n---------- : Calling saveUsername");
        this.tokenStorage.saveUsername(data.username);
        console.log(" \n---------- : Calling saveAuthorities");
        this.tokenStorage.saveAuthorities(data.authorities);
        console.log(" \n---------- : Calling saveAuthorities");
        this.tokenStorage.saveLocationid(data.locationid);
 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(" \n---------- : Calling getAuthorities");
        this.roles = this.tokenStorage.getAuthorities();
        //this._router.navigate(['home']);
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
 
  reloadPage() {
    window.location.reload();
  }
}