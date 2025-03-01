import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State } from './../../store/index';
import { Artist } from './../../store/models/artist.model';
import { Filters } from './../../store/models/filters.model';

import { map } from 'rxjs/operators';
import { ArtistStateType } from './../../store/reducers/artists.reducer';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  filters: Observable<Filters>;
  artists: Observable<Artist[]>;
  limit = 6;

  constructor(private store: Store<State>, private router: Router) {
    this.filters = store.select('filters');
    this.artists = store.select('artists').pipe(
      map((artists: ArtistStateType) => {
        return artists.list.map((n,i) => artists.items[i][n]);
      })
    )
  }

  ngOnInit() {
  }

  handleFiltersChange(filters: Filters): void {
    this.router.navigate(['/artists', this.createParams(filters)]);
  }

  private createParams(filters: Filters): Params {
    const r: any = {};
    console.log(filters.limit)
    if (filters.limit) { r.limit = filters.limit; }
    return r;
  }

  incrementListSize() {
    console.log("scrolled");
    this.handleFiltersChange({
      limit: this.limit * 2
    });
  }
}
