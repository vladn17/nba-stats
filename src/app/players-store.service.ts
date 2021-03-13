import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerData } from './player-data';

const preloaded = [
  {
    first_name: 'Devin',
    height_feet: 6,
    height_inches: 6,
    id: 57,
    last_name: 'Booker',
    position: 'G',
    team: {
      abbreviation: 'PHX',
      city: 'Phoenix',
      conference: 'West',
      division: 'Pacific',
      full_name: 'Phoenix Suns',
      id: 24,
      name: 'Suns',
    },
    weight_pounds: 210,
  },
  {
    id: 237,
    first_name: 'LeBron',
    height_feet: 6,
    height_inches: 8,
    last_name: 'James',
    position: 'F',
    team: {
      id: 14,
      abbreviation: 'LAL',
      city: 'Los Angeles',
      conference: 'West',
      division: 'Pacific',
      full_name: 'Los Angeles Lakers',
      name: 'Lakers',
    },
    weight_pounds: 250,
  },
];

@Injectable({
  providedIn: 'root',
})
export class PlayersStoreService {
  private playersSubject = new BehaviorSubject<PlayerData[]>([]);
  players$ = this.playersSubject.asObservable();

  constructor() {}

  add(player: PlayerData) {
    if (this.playersSubject.value.includes(player)) return;
    this.playersSubject.next([...this.playersSubject.value, player]);
  }

  remove(id: number) {
    const filteredPlayers = this.playersSubject.value.filter(
      (player) => player.id !== id
    );
    this.playersSubject.next(filteredPlayers);
  }

  // method for demo purposes
  addPreloadedPlayers() {
    this.playersSubject.next(preloaded);
  }
}
