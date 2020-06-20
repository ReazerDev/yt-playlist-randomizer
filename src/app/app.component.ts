import { Component, ViewChild } from '@angular/core';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;
  title = 'Youtube Playlist Randomizer';
  public lastPlaylistId: string;

  constructor(private router: Router) {}

  public play(playlistItems) {
    this.videoPlayer.play(playlistItems);
  }
  
  public playVideo(playlistItems, videoId) {
    this.videoPlayer.play(playlistItems, videoId);
  }

  public navigateToPlaylist() {
    this.router.navigate(['playlist']);
  }

  public navigateToLastPlaylist() {
    this.router.navigate(['playlist/' + this.lastPlaylistId]);
  }
}
