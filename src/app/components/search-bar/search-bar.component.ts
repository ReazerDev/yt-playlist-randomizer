import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public search(keyword: string) {
    if (keyword != "") {
      this.router.navigate(['search/' + keyword]);
    }
  }

  public searchEnter(keyword: string, button) {
    button.ripple.launch();
    this.search(keyword);
  }

}
