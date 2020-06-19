import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlaylistItem } from 'src/app/models/PlaylistItem';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  private videos: PlaylistItem[];
  private randomPlaylist: string[] = [];
  private currentVideo: number = 0;
  private playerReady: boolean = false;

  private YT: any;
  private player: any;
  private reframed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.initPlayer();
  }

  public play(videos: PlaylistItem[]) {
    this.randomPlaylist = [];
    this.videos = videos;
    while (this.randomPlaylist.length < this.videos.length) {
      this.randomize();
    }
    this.nextVideo();
  }

  private initPlayer() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      height: '270',
      width: '480',
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showInfo: 0,
        fs: 0,
        playsinline: 1,
        origin: 'http://localhost:4200/playlist'
      },
      events: {
        'onStateChange': this.onPlayerStateChanged.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this)
      }
    })
  }

  private onPlayerReady(event) {
    this.playerReady = true;
  }

  private onPlayerStateChanged(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        break;
      case window['YT'].PlayerState.PAUSED:
        break;
      case window['YT'].PlayerState.ENDED:
        this.nextVideo();
        break;
    }
  }

  private onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.currentVideo);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }

  }

  private nextVideo() {
    this.currentVideo += 1;
    if (this.currentVideo > this.randomPlaylist.length) {
      this.play(this.videos);
    } else {
      this.player.loadVideoById(this.randomPlaylist[this.currentVideo], 0);
      this.player.playVideo();
    }
  }

  private randomize() {
    let number = Math.floor(Math.random() * Math.floor(this.videos.length));

    if (!this.randomPlaylist.includes(this.videos[number].videoId)) {
      this.randomPlaylist.push(this.videos[number].videoId);
    } else {
      this.randomize();
    }
  }

}
