import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Lobby} from '../models/lobby.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LobbyService {

  constructor(private _http : HttpClient) { }


  
getLobby(id : string) : Observable<Lobby>
{
    console.log( "http://localhost:8080/api/lobby/get/" + id);
    return this._http.get("http://localhost:8080/api/lobby/get/" + id)
    .catch(this.handleError);
}



getAllLobbies() : Observable<Lobby[]>
{
    return this._http.get("http://localhost:8080/api/lobby/list/all")
    .catch(this.handleError);
}

// CREATE A LOBBY
public createLobby(lobby:Lobby)
{
  console.log("ID " + lobby.id);
  return this._http.post<Lobby[]>('http://localhost:8080/api/lobby/create', lobby, {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  });
}


handleError(error : Response)
{
    console.error(error);
    return Observable.throw(error);
}


}
