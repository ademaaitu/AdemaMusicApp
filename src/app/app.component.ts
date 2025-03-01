import { OverlayContainer } from "@angular/cdk/overlay";
import { isPlatformBrowser } from "@angular/common";
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSidenav } from "@angular/material/sidenav";
import { NavigationEnd, Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PlaylistCreateComponent } from "./components/playlist-create/playlist-create.component";
import { AuthService } from "./shared/services/auth.service";
import { PlaylistService } from "./shared/services/playlist/playlist.service";
import { State } from "./store/index";
import { User } from "./store/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Adema music';
  @ViewChild('sidenav') sidenav: MatSidenav;
  navMode = 'side';

  playerCollapsed = true;

  darkTheme = false;

  user: Observable<User>;

  singlePage = false;

  singlePages = [
    '/user/login'
  ];

  constructor(private auth: AuthService,
              private store: Store<State>,
              private overlayContainer: OverlayContainer,
              private router: Router,
              private playListService: PlaylistService,

              public dialog: MatDialog

) {

  }

  isMobile() {
    return isPlatformBrowser && (window.innerWidth < 768);
  }

  ngOnInit() {
    this.updateSidenavForWindow();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.isMobile()) {
          this.singlePages.includes(event.url) ? this.singlePage = true : this.singlePage = false;
          this.singlePage ? this.sidenav.close() : this.sidenav.open();
        }
      }
    });
    if (this.darkTheme) {
      this.overlayContainer.getContainerElement().classList.add('sangeet-dark-theme');
    }
  }

  createPlaylist(): void {
    const dialogRef = this.dialog.open(PlaylistCreateComponent, {
      width: '350px',
      data: {
        name: 'My playlist name',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.playListService.createPlaylist(result.name, result.file);
      }
    });

  }

  updateSidenavForWindow() {
    if (this.isMobile()) {
      this.navMode = 'over';
      // this.sidenav.close();
    } else {
      // this.sidenav.open();
      this.playerCollapsed = false;
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.isMobile()) {
      // this.navMode = 'over';
    }
    else {
      // this.navMode = 'side';
      this.playerCollapsed = false;
    }
  }

  logout() {
    this.auth.signOut();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  playerCollapseToggle(collapsed) {
    this.playerCollapsed = collapsed;
  }

  toggleTheme() {
    this.darkTheme = this.darkTheme ? false : true;
  }
}
