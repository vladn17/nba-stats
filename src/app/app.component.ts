import { Component } from '@angular/core';
import { PlayersStoreService } from './players-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private playersStore: PlayersStoreService) {}

  addPreloaded() {
    this.playersStore.addPreloadedPlayers();
  }
}
