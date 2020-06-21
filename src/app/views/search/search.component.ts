import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeSearchService } from 'src/app/services/youtube-search.service';
import { YoutubeVideo } from 'src/app/models/YoutubeVideo';
import { AppComponent } from 'src/app/app.component';

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
