import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of, Subscription } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PlayersAverage } from '../players-average';
import { PlayersStoreService } from '../players-store.service';
import { PlayersService } from '../players.service';

type TransformedPlayersAverage = Omit<PlayersAverage, 'player_id'> & {
  name: string;
};

type State = 'pending' | 'loading' | 'error';

@Component({
  selector: 'app-average-stats',
  templateUrl: './average-stats.component.html',
  styleUrls: ['./average-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AverageStatsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = [
    'name',
    'min',
    'pts',
    'reb',
    'ast',
    'stl',
    'blk',
    'turnover',
    'fg_pct',
    'fg3_pct',
    'ft_pct',
  ];
  dataSource = new MatTableDataSource<TransformedPlayersAverage>([]);
  playersIdMap = new Map<number, string>();
  state: State = 'pending';
  subscription: Subscription | undefined;

  constructor(
    private playersService: PlayersService,
    private playersStore: PlayersStoreService,
    private ref: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.subscription = this.playersStore.players$
      .pipe(
        tap((players) => {
          players.forEach((player) =>
            this.playersIdMap.set(
              player.id,
              player.first_name.slice(0, 1) + '. ' + player.last_name
            )
          );
        }),
        map((players) => players.map((player) => String(player.id))),
        switchMap((ids) => {
          if (ids.length === 0) return of([]);

          this.state = 'loading';
          this.ref.markForCheck();

          return this.playersService.getAverages(ids).pipe(
            map((response) => {
              this.state = 'pending';
              const averages = response.data.map((stats) => {
                const { player_id, ...rest } = stats;
                return { ...rest, name: this.playersIdMap.get(player_id)! };
              });
              return averages;
            }),
            catchError((err) => {
              this.state = 'error';
              return of([] as TransformedPlayersAverage[]);
            })
          );
        })
      )
      .subscribe((averages) => {
        this.dataSource.data = averages;
        this.ref.markForCheck();
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }
}
