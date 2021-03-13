import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { PlayerData } from '../player-data';
import { PlayersStoreService } from '../players-store.service';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerSearchComponent implements OnInit {
  searchText = new FormControl('');
  options$: Observable<PlayerData[]> = of([]);
  constructor(
    private playersService: PlayersService,
    private playersStore: PlayersStoreService
  ) {}

  ngOnInit(): void {
    this.options$ = this.searchText.valueChanges.pipe(
      filter((value: string | PlayerData): value is string => {
        if (typeof value === 'string') return true;
        else {
          this.playersStore.add(value);
          this.searchText.setValue('');
          return false;
        }
      }),
      filter((value: string) => value.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.playersService.searchPlayers(value)),
      map((value) => value.data)
    );
  }

  displayPlayer(player: PlayerData) {
    return player ? `${player.first_name} ${player.last_name}` : '';
  }
}
