import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from "rxjs/operators";
import { PlaylistService } from './../../shared/services/playlist/playlist.service';
import { State } from './../../store/index';
import { Playlist } from './../../store/models/playlist.model';
import { Song } from './../../store/models/song.model';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {
  playlist$: Observable<Playlist>;
  songs$: Observable<Song[]>;
  id: string;
  constructor(private store: Store<State>,
    private route: ActivatedRoute,
    private playlistService: PlaylistService) {
    this.id = route.snapshot.paramMap.get('id');
    this.playlist$ = this.store.select('playlists').pipe(
      switchMap((playlist: Playlist[]) => {
      return playlist.filter(playlistObj => playlistObj.id === this.id);
    }));

    // Get songs from store.
    this.songs$ = this.store.select('songs').pipe(
      map((songs: Object) => {
        return typeof songs[this.id] !== 'undefined' ? songs[this.id] : [];
      })
    )
  }

  ngOnInit() {
    this.getPlaylistSongs(this.id);
  }

  /**
   * Get all songs for this playlist.
   *
   * @param id
   *  the id of the playlist.
   */
  getPlaylistSongs(id) {
    // Call the playlistService.
    this.playlistService.getPlaylistSongs(id);
  }

  /**
   * Play a song from the playlist.
   *
   * @param song
   *  the song to play.
   */
  playSong(song: Song) {
    this.playlistService.playSong(song);
  }

  /**
   * Add multiple songs to playlist.
   *
   * @param songs
   *  The songs to add.
   */
  playAllSongs(songs: Song[]) {
    this.playlistService.playSongs(songs);
  }
}
