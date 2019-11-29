import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  private username: string;
  private locationid: string;
 
  constructor(private tokenStorage: TokenStorageService, private _router : Router) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUsername();
      this.locationid = this.tokenStorage.getLocationid();
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logout() {
    console.log(">>>>>> Logout");
    this.tokenStorage.signOut();
    this._router.navigate(['login']);
    
    
    //this._router.navigate(['auth/login']);
   
    
    //window.location.reload();
  }
}