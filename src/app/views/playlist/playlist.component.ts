import { Component, OnInit } from '@angular/core';
import { YoutubePlaylistService } from 'src/app/services/youtube-playlist.service';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistItem } from 'src/app/models/PlaylistItem';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public playlist: Playlist;
  public playlistItems: PlaylistItem[];

  constructor(private youtube$: YoutubePlaylistService) { }

  ngOnInit(): void {
    this.youtube$.getPlaylist('https://www.youtube.com/playlist?list=PLHoA1d-3PLY-v0rN0P84CsWuVacq9_zuB').subscribe(res => {
      this.playlist = res;
    })
    this.youtube$.getPlaylistItems('https://www.youtube.com/playlist?list=PLHoA1d-3PLY-v0rN0P84CsWuVacq9_zuB');
    this.youtube$.watch().subscribe(res => {
      this.playlistItems = res;
    })
  }

}
