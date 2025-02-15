import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Album } from './../../store/models/album.model';
import { Song } from './../../store/models/song.model';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { State } from './../../store/index';

import { Artist } from './../../store/models/artist.model';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist: Artist;
  slug: string;
  albums: Observable<Album[]>;

  artistSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<State>) {
    this.artistSubscription = store.select('artists').subscribe(artists => {
      this.slug = route.snapshot.params.slug;
      const index = artists.list.indexOf(this.slug);
      this.artist = artists.items[index][this.slug];
    });
    this.albums = store.select('albums').pipe(
      map(albums => {
        console.log(albums[this.slug]);
        return typeof albums[this.slug] !== 'undefined' ? Object.values(albums[this.slug]) : [];
      })
    )

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.artistSubscription.unsubscribe();
  }

  /**
   * Add song to playlist.
   *
   * @param song
   *  song to add.
   */
  addSongToPlaylist(song: Song) {
  }
}
