import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeSearchService } from 'src/app/services/youtube-search.service';
import { YoutubeVideo } from 'src/app/models/YoutubeVideo';
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private keyword: string;
  private lastSearchKeyword: string;
  public searchResults: YoutubeVideo[];

  constructor(
    private route: ActivatedRoute,
    private youtubeSearch$: YoutubeSearchService,
    private cookieService: CookieService,
    private appComponent: AppComponent,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.search();
    });
  }

  ngOnInit(): void {
    this.search();
  }

  public search() {
    this.keyword = this.route.snapshot.params.keyword;
    if (this.lastSearchKeyword == this.keyword) {
      return;
    }
    this.lastSearchKeyword = this.keyword;

    this.youtubeSearch$.search(this.keyword).subscribe(res => {
      this.searchResults = res;
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

  public playVideo(video: YoutubeVideo) {
    if (!this.appComponent.videoPlayer.isPlaying) {
      this.appComponent.videoPlayer.play([], video);
    } else {
      this.appComponent.videoPlayer.moveVideoToNewIndex(video);
    }
  }

}
