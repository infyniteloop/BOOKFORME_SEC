import { Injectable } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserdataService {

  constructor(private _tokenStorage: TokenStorageService) { }

  
updateUserData() : Observable<string>
{
 
  return Observable.of(this._tokenStorage.getUsername()).map(o => JSON.stringify(o));
    
}

 
}
