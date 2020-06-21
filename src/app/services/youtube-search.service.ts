import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { YoutubeVideo } from '../models/YoutubeVideo';

@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  public search(keyword: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&part=snippet&maxResults=25&q=' + keyword).pipe(map(res => {
      return YoutubeVideo.collection(res['items'], true);
    }));
  }
}
