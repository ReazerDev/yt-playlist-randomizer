import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss']
})
export class YoutubeVideoComponent implements OnInit {
  @Input() title: string = "Unavailable";
  @Input() channelName: string = "Unavailable";
  @Input() thumbnailUrl: string = "assets/unavailable.jpg";
  @Input() videoLength: string = "0:00";

  constructor() { }

  ngOnInit(): void {
  }

}
