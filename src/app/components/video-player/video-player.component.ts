import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { YoutubeVideo } from 'src/app/models/YoutubeVideo';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  private videos: YoutubeVideo[];
  public randomPlaylist: YoutubeVideo[] = [];
  private currentVideo: number = 0;
  public isReady: boolean = false;
  public isPlaying: boolean = false;
  public showList: boolean = false;

  private YT: any;
  private player: any;
  private reframed: boolean = false;

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.initPlayer();
  }

  public play(videos: YoutubeVideo[], startWith?: YoutubeVideo) {
    this.randomPlaylist = [];
    this.currentVideo = 0;

    if (startWith) {
      this.randomPlaylist.push(startWith);
    }

    this.isPlaying = true;
    this.videos = videos;
    while (this.randomPlaylist.length < this.videos.length) {
      this.randomize();
    }
    this.nextVideo();
  }

  public moveVideoToNewIndex(startWith) {
    if (!this.randomPlaylist.includes(startWith)) {
      this.randomPlaylist.push(startWith);
    }
    if (this.cookieService.get('mode') == 'me') {
      this.moveArrayItem(this.randomPlaylist, this.randomPlaylist.findIndex(x => x == startWith), this.currentVideo);
    }
  }

  public changeListState() {
    this.showList = !this.showList;
  }

  public clearList() {
    this.randomPlaylist = [];
  }

  public removeVideo(video: YoutubeVideo) {
    this.randomPlaylist = this.randomPlaylist.filter(x => x != video);
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
        origin: 'http://ytparty.reazer.net'
      },
      events: {
        'onStateChange': this.onPlayerStateChanged.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this)
      }
    })
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

  private onPlayerReady(event) {
    this.isReady = true;
  }

  private nextVideo() {
    if (this.currentVideo == this.randomPlaylist.length) {
      this.play(this.videos);
    } else {
      this.player.loadVideoById(this.randomPlaylist[this.currentVideo].videoId, 0);
      this.player.playVideo();
    }
    this.currentVideo += 1;
  }

  private randomize() {
    let number = Math.floor(Math.random() * Math.floor(this.videos.length));

    if (!this.randomPlaylist.includes(this.videos[number])) {
      this.randomPlaylist.push(this.videos[number]);
    } else {
      this.randomize();
    }
  }

  private moveArrayItem(array: any[], oldIndex, newIndex) {
    if (oldIndex == newIndex - 1) {
      return;
    }
    while (oldIndex < 0) {
      oldIndex += array.length;
    }
    while (newIndex < 0) {
      newIndex += array.length;
    }
    if (newIndex >= array.length) {
      var k = newIndex - array.length;
      while ((k--) + 1) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  }

}
