import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { PlaylistItem } from '../models/PlaylistItem';
import { Playlist } from '../models/Playlist';

@Injectable({
  providedIn: 'root'
})
export class YoutubePlaylistService {
  private subject = new BehaviorSubject<PlaylistItem[]>(null);
  private apiKey: string = environment.api_key;
  private nextPageToken: string;
  private itemCount: number = 0;
  private items: PlaylistItem[] = [];
  private videoUrl: string = 'https://www.googleapis.com/youtube/v3/videos?key=' + this.apiKey + '&part=snippet,contentDetails&id=';

  constructor(public http: HttpClient) { }

  public getPlaylist(url: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&part=snippet&fields=items/snippet(title,description,thumbnails)&id=' + url.replace('https://www.youtube.com/playlist?list=', '')).pipe(map(res => {
      return Playlist.new(res['items'][0]);
    }));
  }

  public getPlaylistItems(url: string) {
    this.getPlaylistRequest(url).subscribe(res => {
      this.items = this.items.concat(PlaylistItem.collection(res['items']));
      this.nextPageToken = res['nextPageToken'];
      this.itemCount = res['pageInfo']['totalResults'];
      if (this.items.length < this.itemCount) {
        this.getPlaylistItems(url);
      }
      if (this.items.length == this.itemCount) {
        /*this.getVideoRequest().subscribe(res => {
          console.log(res);
        })*/
        this.subject.next(this.items);
      }
    });
  }

  private getPlaylistRequest(url) {
    return this.http.get(this.createUrl(url)).pipe(map(res => {
      return res;
    }));
  }

  private getVideoRequest() {
    let url: string = this.videoUrl;

    for (let video of this.items) {
      url = url + video.videoId + ',';
    }

    //return this.http.get(url).pipe(map(res => {
      //return res;
    //}));
  }

  private createUrl(url: string) {
    let apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + url.replace('https://www.youtube.com/playlist?list=', '') + '&part=snippet&fields=nextPageToken,pageInfo,items/snippet(title,resourceId/videoId,thumbnails)&maxResults=50';
    if (this.nextPageToken) {
      apiUrl = apiUrl + '&pageToken=' + this.nextPageToken;
    }
    return apiUrl;
  }

  public watch(): Observable<PlaylistItem[]> {
    return this.subject.asObservable();
  }
}
