import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.scss']
})
export class ModeComponent implements OnInit {
  private mode: string;
  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.mode = this.route.snapshot.params.mode;

    console.log(this.mode);
    if (this.mode == 'me' || 'parents') {
      this.cookieService.set('mode', this.mode, 365);
      this.router.navigate(['playlist']);
    }
  }
}
