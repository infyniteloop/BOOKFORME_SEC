import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lobby } from '../models/lobby.model';
import { LobbyService } from '../services/lobby.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  lobby : Lobby= {

    id : null,
    lobbyName : null,
    lobbyCode : null,
    locationid : null,


  };
  lobbies : Lobby[];
  statusMessage : string ="Loading Data ...  ";

  constructor(private _lobbyService : LobbyService) {


   }

  ngOnInit() {

    this._lobbyService.getAllLobbiesByLocation()
    .subscribe(lobbyData => this.lobbies = lobbyData,
        (error) => {
            this.statusMessage = 'Problem with the service';

        });

       
  }

  saveLobby(lobby: Lobby): void {
    console.log("Lobby Form : " + JSON.stringify(lobby));

    if(lobby.id == null)
    {
      this._lobbyService.createLobby(lobby)
      .subscribe(
        data => { alert("Lobby Created Successfully");}
    
      );
    }
    else{
      this._lobbyService.updateLobby(lobby)
      .subscribe(
        data => { alert("Lobby Updated Successfully");}
    
      );
    }
    

    this.reloadPage();
  }
  
  removeLobby(id: string)
  {

    
    if(confirm("Are you sure to delete the lobby")) {      
      
      this._lobbyService.deleteLobby(id)
      .subscribe(
        data => { alert("Lobby Deleted Successfully");}
    
      );
      this.reloadPage();

    }
    

    
  }

  editLobby(id: string)
  {
    
    this._lobbyService.getLobby(id)
    .subscribe(
      (lobby) => { this.lobby = lobby;},
      (err: any) => console.log(err)
  
    );
    
  }

  reloadPage() {
    window.location.reload();
  }


}
