import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubePlaylistService } from 'src/app/services/youtube-playlist.service';
import { Playlist } from 'src/app/models/Playlist';
import { YoutubeVideo } from 'src/app/models/YoutubeVideo';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
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

  public playVideo(videoId: string) {
    if (!this.appComponent.videoPlayer.isPlaying) {
      this.appComponent.videoPlayer.play(this.playlistItems, videoId);
    } else {
      this.appComponent.videoPlayer.moveVideoToNewIndex(videoId);
    }
  }

  public openPlaylist(playlistLink: string) {
    this.listId = playlistLink.replace('https://www.youtube.com/playlist?list=', '');
    this.router.navigate(['playlist/' + this.listId]);
    this.getPlaylist();
    this.appComponent.lastPlaylistId = this.listId;
  }

}
