import { Injectable } from '@angular/core';
 
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const LOCATIONID_KEY = 'AuthLocationid';
 
@Injectable()
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }
 
  signOut() {
    console.log(">>>>>> Clearing session");
    window.sessionStorage.clear();
  }
 
  public saveToken(token: string) {
    console.log(" \n>>>>>>>>>> TokenStorageService / saveToken");
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
 
  public getToken(): string {
    console.log(" \n>>>>>>>>>>  TokenStorageService / getToken");
    return sessionStorage.getItem(TOKEN_KEY);
  }
 
  public saveUsername(username: string) {
    console.log(" \n>>>>>>>>>> TokenStorageService / saveUsername");
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
 
  public getUsername(): string {
    console.log(" \n>>>>>>>>>>  TokenStorageService / getUsername");
    return sessionStorage.getItem(USERNAME_KEY);
  }
 

  
  public saveLocationid(locationid: string) {
    console.log(" \n>>>>>>>>>> TokenStorageService / saveLocationid");
    window.sessionStorage.removeItem(LOCATIONID_KEY);
    window.sessionStorage.setItem(LOCATIONID_KEY, locationid);
  }
 
  public getLocationid(): string {
    console.log(" \n>>>>>>>>>>  TokenStorageService / getLocationid");
    return sessionStorage.getItem(LOCATIONID_KEY);
  }
 

  public saveAuthorities(authorities: string[]) {
    console.log(" \n>>>>>>>>>>  TokenStorageService / saveAuthorities");
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
 
  public getAuthorities(): string[] {
    console.log(" \n>>>>>>>>>>  TokenStorageService / getAuthorities");
    this.roles = [];
 
    if (sessionStorage.getItem(TOKEN_KEY)) {
      console.log("Token : " + sessionStorage.getItem(TOKEN_KEY));
      console.log("Session " + JSON.stringify(sessionStorage));
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
 
    return this.roles;
  }
}