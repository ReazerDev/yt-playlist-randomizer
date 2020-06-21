import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { YoutubeVideo } from '../models/YoutubeVideo';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  public search(keyword: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key=' + this.cookieService.get('apiKey') + '&part=snippet&maxResults=25&q=' + keyword).pipe(map(res => {
      return YoutubeVideo.collection(res['items'], true);
    }));
  }
}
