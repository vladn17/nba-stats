import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlayersStoreService } from '../players-store.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersListComponent implements OnInit {
  constructor(public playersStore: PlayersStoreService) {}

  ngOnInit(): void {}
}
