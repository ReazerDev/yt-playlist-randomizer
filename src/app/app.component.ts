import { Component, ViewChild, OnInit } from '@angular/core';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;
  title = 'Youtube Playlist Randomizer';

  constructor(private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.cookieService.set('apiKey', environment.apiKeys[0]);
  }

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
    this.cookieService.get('lastPlaylistId') ? this.router.navigate(['playlist/' + this.cookieService.get('lastPlaylistId')]) : this.router.navigate(['playlist/']);
  }
}
