import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-playlist-video',
  templateUrl: './playlist-video.component.html',
  styleUrls: ['./playlist-video.component.scss']
})
export class PlaylistVideoComponent implements OnInit {
  @Input() title: string = "Unavailable";
  @Input() channelName: string = "Unavailable";
  @Input() thumbnailUrl: string = "assets/unavailable.jpg";
  @Input() videoLength: string = "0:00";

  constructor() { }

  ngOnInit(): void {
  }

}
