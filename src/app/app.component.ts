import { Component, ViewChild } from '@angular/core';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;
  title = 'Youtube Playlist Randomizer';

  public play(playlistItems) {
    this.videoPlayer.play(playlistItems);
  }
}
