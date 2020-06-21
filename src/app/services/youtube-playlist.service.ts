import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { YoutubeVideo } from '../models/YoutubeVideo';
import { Playlist } from '../models/Playlist';

@Injectable({
  providedIn: 'root'
})
export class YoutubePlaylistService {
  private subject = new BehaviorSubject<YoutubeVideo[]>(null);
  private apiKey: string = environment.apiKey;
  private nextPageToken: string;
  private itemCount: number = 0;
  private items: YoutubeVideo[] = [];
  private videoUrl: string = 'https://www.googleapis.com/youtube/v3/videos?key=' + this.apiKey + '&part=snippet,contentDetails&id=';

  constructor(private http: HttpClient) { }

  public getPlaylist(playlistId: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&part=snippet&fields=items/snippet(title,description,thumbnails)&id=' + playlistId).pipe(map(res => {
      return Playlist.new(res['items'][0]);
    }));
  }

  public getPlaylistItems(playlistId: string) {
    this.getPlaylistRequest(playlistId).subscribe(res => {
      this.items = this.items.concat(YoutubeVideo.collection(res['items']));
      this.nextPageToken = res['nextPageToken'];
      this.itemCount = res['pageInfo']['totalResults'];
      if (this.items.length < this.itemCount) {
        this.getPlaylistItems(playlistId);
      }
      if (this.items.length == this.itemCount) {
        /*this.getVideoRequest().subscribe(res => {
          console.log(res);
        })*/
        this.subject.next(this.items);
      }
    });
  }

  private getPlaylistRequest(playlistId) {
    return this.http.get(this.createUrl(playlistId)).pipe(map(res => {
      return res;
    }));
  }

  private createUrl(playlistId: string) {
    let apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + playlistId + '&part=snippet&fields=nextPageToken,pageInfo,items/snippet(title,resourceId/videoId,thumbnails)&maxResults=50';
    if (this.nextPageToken) {
      apiUrl = apiUrl + '&pageToken=' + this.nextPageToken;
    }
    return apiUrl;
  }

  public watch(): Observable<YoutubeVideo[]> {
    return this.subject.asObservable();
  }
}
