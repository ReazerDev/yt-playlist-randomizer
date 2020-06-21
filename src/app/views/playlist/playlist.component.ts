import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubePlaylistService } from 'src/app/services/youtube-playlist.service';
import { Playlist } from 'src/app/models/Playlist';
import { YoutubeVideo } from 'src/app/models/YoutubeVideo';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public playlist: Playlist;
  public playlistItems: YoutubeVideo[];
  public listId: string;

  constructor(
    private youtube$: YoutubePlaylistService,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.listId = this.route.snapshot.params.list;

    if (this.listId) {
      this.getPlaylist();
    }
  }

  public getPlaylist() {
    this.playlist = null;
    this.playlistItems = null;
    this.youtube$.getPlaylist(this.listId).subscribe(res => {
      this.playlist = res;
    });
    this.youtube$.getPlaylistItems(this.listId);
    this.youtube$.watch().subscribe(res => {
      this.playlistItems = res;
    });
  }

  public play() {
    this.appComponent.play(this.playlistItems);
  }

  public playVideo(video: YoutubeVideo) {
    if (!this.appComponent.videoPlayer.isPlaying) {
      this.appComponent.videoPlayer.play(this.playlistItems, video);
    } else {
      this.appComponent.videoPlayer.moveVideoToNewIndex(video);
    }
  }

  public openPlaylist(playlistLink: string) {
    this.listId = playlistLink.replace('https://www.youtube.com/playlist?list=', '');
    this.cookieService.set('lastPlaylistId', this.listId);
    this.router.navigate(['playlist/' + this.listId]);
  }

}
