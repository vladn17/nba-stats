import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerData } from './player-data';
import { PlayersAverage } from './players-average';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private playersUrl = 'https://www.balldontlie.io/api/v1/players';
  private averagesUrl = 'https://www.balldontlie.io/api/v1/season_averages';

  constructor(private http: HttpClient) {}

  searchPlayers(term: string): Observable<{ data: PlayerData[] }> {
    return this.http.get<{ data: PlayerData[] }>(this.playersUrl, {
      params: { search: term },
    });
  }

  getAverages(playersIds: string[]): Observable<{ data: PlayersAverage[] }> {
    return this.http.get<{ data: PlayersAverage[] }>(this.averagesUrl, {
      params: { 'player_ids[]': playersIds },
    });
  }
}
