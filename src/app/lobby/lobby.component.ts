import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lobby } from '../models/lobby.model';
import { LobbyService } from '../services/lobby.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  lobbies : Lobby[];
  statusMessage : string ="Loading Data ...  ";

  constructor(private _lobbyService : LobbyService) { }

  ngOnInit() {

    this._lobbyService.getAllLobbies()
    .subscribe(lobbyData => this.lobbies = lobbyData,
        (error) => {
            this.statusMessage = 'Problem with the service';

        });
  }

  saveLobby(lobbyForm: NgForm): void {
    console.log(lobbyForm.value);

    this._lobbyService.createLobby(lobbyForm.value)
    .subscribe(
      data => { alert("Lobby Created Successfully");}

      
  
    );

    this.reloadPage();
  }
  

  reloadPage() {
    window.location.reload();
  }


}
