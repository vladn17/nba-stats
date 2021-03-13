import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerData } from '../player-data';
import { PlayersStoreService } from '../players-store.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  @Input() player!: PlayerData;
  constructor(private playersStore: PlayersStoreService) {}

  remove() {
    this.playersStore.remove(this.player.id);
  }
}
