import { Component, OnInit } from '@angular/core'; 
import { TokenStorageService } from '../auth/token-storage.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
 
  constructor(private token: TokenStorageService) { }
 
  ngOnInit() {
    console.log(" \n>>>>>>>>>> : HomeComponent / ngOnInit");
    console.log(" \n---------- : Calling getToken(), getUsername() and getAuthorities()");
    this.info = {
      
    token: this.token.getToken(),
    username: this.token.getUsername(),
    authorities: this.token.getAuthorities(),
    locationid: this.token.getLocationid()
    };
  }
 
  logout() {
    this.token.signOut();
    window.location.reload();
  }
}