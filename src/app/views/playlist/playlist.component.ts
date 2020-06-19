import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubePlaylistService } from 'src/app/services/youtube-playlist.service';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistItem } from 'src/app/models/PlaylistItem';
import { VideoPlayerComponent } from 'src/app/components/video-player/video-player.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public playlist: Playlist;
  public playlistItems: PlaylistItem[];

  constructor(
    private youtube$: YoutubePlaylistService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.youtube$.getPlaylist('https://www.youtube.com/playlist?list=PLHoA1d-3PLY-v0rN0P84CsWuVacq9_zuB').subscribe(res => {
      this.playlist = res;
    });
    this.youtube$.getPlaylistItems('https://www.youtube.com/playlist?list=PLHoA1d-3PLY-v0rN0P84CsWuVacq9_zuB');
    this.youtube$.watch().subscribe(res => {
      this.playlistItems = res;
    });
  }

  public play() {
    this.appComponent.play(this.playlistItems);
  }

}
