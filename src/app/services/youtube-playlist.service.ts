import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { YoutubeVideo } from '../models/YoutubeVideo';
import { Playlist } from '../models/Playlist';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class YoutubePlaylistService {
  private subject = new BehaviorSubject<YoutubeVideo[]>(null);
  private nextPageToken: string;
  private itemCount: number = 0;
  private items: YoutubeVideo[] = [];

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  public getPlaylist(playlistId: string) {
    this.items = [];
    this.itemCount = 0;
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.cookieService.get('apiKey') + '&part=snippet,contentDetails&fields=items/contentDetails(itemCount),items/snippet(title,description,thumbnails)&id=' + playlistId).pipe(map(res => {
      return Playlist.new(res['items'][0]);
    }));
  }

  public getPlaylistItems(playlistId: string) {
    this.getPlaylistRequest(playlistId).subscribe(res => {
      this.items = this.items.concat(YoutubeVideo.collection(res['items']));
      this.nextPageToken = res['nextPageToken'];
      this.itemCount = res['pageInfo']['totalResults'];
      if (this.items.length < this.itemCount) {
        this.subject.next(this.items);
        this.getPlaylistItems(playlistId);
      }
      if (this.items.length == this.itemCount) {
        this.subject.next(this.items);
      }
    }, error => {
      switch (error.status) {
        case 403:
          let currIndex = Number.parseInt(this.cookieService.get('apiKeyIndex'));
          this.cookieService.set('apiKey', environment.apiKeys[currIndex + 1]);
          this.cookieService.set('apiKeyIndex', String(currIndex + 1));
        break;
      }
    });
  }

  private getPlaylistRequest(playlistId) {
    return this.http.get(this.createUrl(playlistId)).pipe(map(res => {
      return res;
    }));
  }

  private createUrl(playlistId: string) {
    let apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.cookieService.get('apiKey') + '&playlistId=' + playlistId + '&part=snippet&fields=nextPageToken,pageInfo,items/snippet(title,resourceId/videoId,thumbnails)&maxResults=50';
    if (this.nextPageToken) {
      apiUrl = apiUrl + '&pageToken=' + this.nextPageToken;
    }
    return apiUrl;
  }

  public watch(): Observable<YoutubeVideo[]> {
    return this.subject.asObservable();
  }
}
