import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Lobby} from '../models/lobby.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable()
export class LobbyService {

  constructor(private _http : HttpClient,
              private _tokenStorage: TokenStorageService) { }


  
getLobby(id : string) : Observable<Lobby>
{
    //console.log( "http://localhost:8080/api/lobby/get/" + id);
    return this._http.get("http://localhost:8080/api/lobby/get/" + id)
    .catch(this.handleError);
}



getAllLobbiesByLocation() : Observable<Lobby[]>
{
 
    return this._http.get("http://localhost:8080/api/lobby/list/all/" + this._tokenStorage.getLocationid())
    .catch(this.handleError);
}

// CREATE A LOBBY
public createLobby(lobby:Lobby)
{
  lobby.locationid = this._tokenStorage.getLocationid();
  return this._http.post<Lobby[]>('http://localhost:8080/api/lobby/create', lobby, {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }).catch(this.handleError);
    
}

// EDIT A LOBBY
public updateLobby(lobby:Lobby)
{
  lobby.locationid = this._tokenStorage.getLocationid();
  return this._http.put<Lobby[]>('http://localhost:8080/api/lobby/update', lobby, {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }).catch(this.handleError);
    
}

// DELETE A LOBBY
public deleteLobby(id : string)
{
   
  return this._http.delete('http://localhost:8080/api/lobby/delete/'+ id)
  .catch(this.handleError);
}


handleError(error : Response)
{
    console.error(error);
    return Observable.throw(error);
}


}
